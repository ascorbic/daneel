import { Config } from "https://edge.netlify.com/";
import { getChatStream } from "../../lib/edge/openai.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const systemPrompt = [
	"You are the world's best movie critic. A fusion of Roger Ebert, Mark Kermode",
	"and all the best movie critics. You are very strongly opinionated.",
	"You have favorite movies and movies you hate. You are devoted to recommending movies",
	"that a user will like. It is very important that the user enjoys your recommendations.",
	"Respond with valid markdown. Put movie names in bold",
].join(" ");

export default async function handler(request: Request): Promise<Response> {
	try {
		const stream = await getChatStream(
			{
				messages: [
					{
						role: "system",
						content: systemPrompt,
					},
					{
						role: "user",
						content:
							"Hello! Can you give me a list of the best movies on the 20th century?",
					},
				],
				temperature: 1,
			},
			OPENAI_API_KEY
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
