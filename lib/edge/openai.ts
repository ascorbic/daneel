import { fetchEventSource } from "https://esm.sh/@fortaine/fetch-event-source@3.0.6";
import { type ChatCompletionOptions } from "https://deno.land/x/openai@1.3.0/mod.ts";
import { getResponseStream } from "./streams.ts";

export { appConfig } from "../../config.edge.ts";

export type ChatOptions = Omit<ChatCompletionOptions, "stream" | "model">;
export function getChatStream(
  options: ChatOptions,
  apiKey: string
): ReadableStream {
  const ctrl = new AbortController();

  const { send, stream, close } = getResponseStream();

  fetchEventSource("https://api.openai.com/v1/chat/completions", {
    onmessage: (event) => {
      const { data } = event;
      if (data === "[DONE]") {
        ctrl.abort();
        send("event: done\n\n");
        close();
      }
      const res = JSON.parse(event.data);
      send(`event: delta\ndata: ${JSON.stringify(res?.choices[0]?.delta)}\n\n`);
    },
    // deno-lint-ignore require-await
    onopen: async () => {
      send(`event: open\n\n`);
    },
    onerror: (event) => {
      console.error(event);
      send(`event: error\ndata: ${event}\n\n`);
      ctrl.abort();
    },
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    signal: ctrl.signal,
    body: JSON.stringify({
      ...options,
      model: "gpt-3.5-turbo",
      stream: true,
    }),
  });
  return stream;
}

export function sanitizeMessages(
  messages: ChatCompletionOptions["messages"],
  historyLength = 8,
  maxMessageLength = 1000
): ChatCompletionOptions["messages"] {
  return messages.slice(-historyLength).map(({ content, role }) => {
    if (role !== "assistant" && role !== "user") {
      return { role: "", content: "" };
    }
    content = content.slice(0, maxMessageLength);
    return { content, role };
  });
}
