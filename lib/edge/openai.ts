import OpenAI from "https://deno.land/x/openai@v4.25.0/mod.ts";

import type {
  ChatCompletionCreateParamsStreaming,
  ChatCompletionMessageParam,
} from "https://deno.land/x/openai@v4.25.0/resources/mod.ts";

export { appConfig } from "../../config.edge.ts";

export type ChatOptions = Omit<ChatCompletionCreateParamsStreaming, "stream">;

export async function getChatStream(
  options: ChatOptions,
  apiKey: string,
): Promise<ReadableStream> {
  const openai = new OpenAI({ apiKey });

  const response = await openai.chat.completions.create({
    ...options,
    stream: true,
  });

  return response.toReadableStream();
}

export function sanitizeMessages(
  messages: Array<ChatCompletionMessageParam>,
  historyLength = 8,
  maxMessageLength = 1000,
): Array<ChatCompletionMessageParam> {
  return messages.slice(-historyLength).map(({ content, role }) => {
    if (role !== "assistant" && role !== "user") {
      return;
    }
    content = content?.slice(0, maxMessageLength);
    return { content, role } as ChatCompletionMessageParam;
  }).filter(Boolean) as Array<ChatCompletionMessageParam>;
}
