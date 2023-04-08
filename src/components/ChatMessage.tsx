import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
interface Props {
  message: ChatMessage;
}

/**
 * This component renders a single chat message. It is rendered according to
 * whether it isa  message from the assistant or the user.
 */

export const ChatMessage: React.FC<React.PropsWithChildren<Props>> = ({
  message,
}) =>
  message.role === "user" ? (
    <div className="flex items-end justify-end">
      <div className="bg-gray-300 border-gray-100 border-2 rounded-lg p-2 max-w-lg">
        <p>{message.content}</p>
      </div>
    </div>
  ) : (
    <div className="flex items-end">
      <div className="bg-gray-100 border-gray-300 border-2 rounded-lg p-2 mr-20">
        <ReactMarkdown children={message.content} remarkPlugins={[remarkGfm]} />
      </div>
    </div>
  );
