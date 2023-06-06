import { ChatOpenAI } from "https://esm.sh/langchain/chat_models/openai";
import {
  HumanChatMessage,
  SystemChatMessage,
} from "https://esm.sh/langchain/schema";

export default async function handler() {
  const chat = new ChatOpenAI({ temperature: 0 });
  const response = await chat.call([
    new SystemChatMessage(
      "You are a helpful assistant that translates English to French."
    ),
    new HumanChatMessage("Translate: I love programming."),
  ]);
  console.log(response.text);
  return new Response(response.text, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
export const config = {
  path: "/api/langchain",
};
