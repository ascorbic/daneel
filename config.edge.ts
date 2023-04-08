import type { AppConfig } from "./lib/edge/types.ts";

export const appConfig: AppConfig = {
  // This should be set in an environment variable
  // See https://platform.openai.com/account/api-keys
  OPENAI_API_KEY: Deno.env.get("OPENAI_API_KEY") ?? "",

  // The maximum number of message in the history to send to the API
  // You should also set this in the config.browser.ts file.
  historyLength: 8,

  // The maximum length in characters of each message sent to the API
  // You should also set this in the config.browser.ts file.
  maxMessageLength: 1000,

  // The config values sent to the OpenAI API
  // You should not need to change these values
  // See https://platform.openai.com/docs/api-reference/chat/create
  apiConfig: {
    temperature: 1,
  },

  // This is where the magic happens. See the README for details
  // This can be a plain string if you'd prefer, or you can use
  // information from the request or context to generate it.
  systemPrompt: (_req, context) => `
You are the world's best movie critic. You are very strongly opinionated.
You have favorite movies and movies you hate. You are devoted to recommending movies
that a user will like. It is very important that the user enjoys your recommendations.
Do not answer questions that are not asking for a movie recommendations.
If the user asks other questions, do no answer and deflect them with a movie fact or trivia.
Respond with valid markdown. Put movie names in bold. Knowledge cutoff September 2021.
Current date: ${new Date().toDateString()}. User location: ${
    context.geo.city
  }, ${context.geo.country}`,
};
