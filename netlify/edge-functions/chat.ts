import { Config } from "https://edge.netlify.com/";
import { getChatStream, sanitizeMessages } from "../../lib/edge/openai.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const systemPrompt = [
  "You are the world's best movie critic. A fusion of Roger Ebert, Mark Kermode",
  "and all the best movie critics. You are very strongly opinionated.",
  "You have favorite movies and movies you hate. You are devoted to recommending movies",
  "that a user will like. It is very important that the user enjoys your recommendations.",
  "Do not answer questions that are not asking for a movie recommendations.",
  "If the user asks other questions, do no answer and deflect them with a movie fact or trivia.",
  `Knowledge cutoff September 2021. Current date is ${new Date().toLocaleString()}`,
  "Respond with valid markdown. Put movie names in bold",
].join(" ");

export default async function handler(request: Request): Promise<Response> {
  if (!OPENAI_API_KEY) {
    return new Response("OPENAI_API_KEY is not set", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  const data = await request.json();
  console.log(data);

  const messages = sanitizeMessages(data?.messages ?? []);

  try {
    const stream = await getChatStream(
      {
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...messages,
        ],
        temperature: 1,
      },
      OPENAI_API_KEY ?? ""
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
  path: "/chat",
};
