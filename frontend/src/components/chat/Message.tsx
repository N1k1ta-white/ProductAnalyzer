import { MessageReduxState } from "@/types/chat.ts";

interface Props {
    message: MessageReduxState;
}

function Message({ message }: Props) {
    const isMyMessage = message.senderId === 1; // Тут подставь ID текущего пользователя
    function formatTimestamp(timestamp: string): string {
        const messageDate = new Date(timestamp);
        const today = new Date();

        // Проверим, если сообщение было отправлено сегодня
        if (messageDate.toDateString() === today.toDateString()) {
            // Если да, выводим только время
            return messageDate.toLocaleTimeString();
        } else {
            // Если нет, выводим полную дату
            return messageDate.toLocaleDateString();
        }
    }
    return (
        <div className={`flex ${isMyMessage ? "justify-end" : "justify-start"} my-2`}>
            <div className="flex items-center gap-2 ">
                <div className="text-gray-500">{formatTimestamp(message.timestamp)}</div>
                <div
                    className={`max-w-xs p-3 rounded-lg shadow-md ${
                        isMyMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                    }`}
                >
                    {message.message}
                </div>
            </div>
        </div>
    );
}

export default Message;
