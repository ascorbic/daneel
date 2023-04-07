import { useMemo, useState } from "react";
import { App } from "../App";
import "./index.css";
import { fetchEventSource } from "@fortaine/fetch-event-source";

export default function Index() {
	const [currentChat, setCurrentChat] = useState<string | null>(null);

	const signal = useMemo(() => new AbortController().signal, []);

	const appendDelta = (data: string) => {
		const message = JSON.parse(data);
		if (message?.role === "assistant") {
			setCurrentChat("");
			return;
		}
		if (message.content) {
			setCurrentChat((curr) => curr + message.content);
		}
	};

	const getChat = () => {
		fetchEventSource("/chat", {
			signal,
			onmessage: (event) => {
				console.log(event, Date.now());
				if (event.event === "delta") {
					appendDelta(event.data);
				} else if (event.event === "open") {
					setCurrentChat("");
				}
			},
		});
	};

	return (
		<App title="Home">
			<div className="App"></div>
			{currentChat ? <div>{currentChat}</div> : null}
			<button onClick={getChat}>Get chat</button>
		</App>
	);
}
