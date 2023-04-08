import type { Config, Context } from "https://edge.netlify.com/";
import { getChatStream, sanitizeMessages } from "../../lib/edge/openai.ts";

import { appConfig } from "../../config.edge.ts";

if (!appConfig.OPENAI_API_KEY || !appConfig.systemPrompt) {
  throw new Error(
    "OPENAI_API_KEY and systemPrompt must be set in config.edge.ts"
  );
}

export default async function handler(
  request: Request,
  context: Context
): Promise<Response> {
  const prompt =
    typeof appConfig.systemPrompt === "function"
      ? await appConfig.systemPrompt(request, context)
      : appConfig.systemPrompt;

  try {
    const data = await request.json();

    // This only trims the size of the messages, to avoid abuse of the API.
    // You should do any extra validation yourself.
    const messages = sanitizeMessages(
      data?.messages ?? [],
      appConfig.historyLength,
      appConfig.maxMessageLength
    );
    const stream = await getChatStream(
      {
        // Optional. This can also be set to a real user id, session id or leave blank.
        // See https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids
        user: context.ip,
        ...appConfig.apiConfig,
        messages: [
          {
            role: "system",
            content: prompt,
          },
          ...messages,
        ],
      },
      appConfig.OPENAI_API_KEY ?? ""
    );
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(e.message, {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

export const config: Config = {
  path: "/api/chat",
};
