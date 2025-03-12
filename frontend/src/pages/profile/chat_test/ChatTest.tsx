import { useEffect, useRef, useState } from "react";
import { socket } from "@/socket.ts";
import { MessageReduxState } from "@/types/chat.ts";
import Message from "@/components/chat/Message.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store.ts";

function ChatTest() {
    const inputRef = useRef<HTMLInputElement>(null); // Исправлено: useRef<HTMLInputElement>
    const user = useSelector((state: RootState) => state.authData.user);
    const [messages, setMessages] = useState<MessageReduxState[]>([]);

    useEffect(() => {
        socket.connect();

        function onConnect() {
            console.log("Connected");
        }

        function onDisconnect() {
            console.log("Disconnected");
        }

        function onMessage(value: MessageReduxState) {
            setMessages(prevMessages => [...prevMessages, value]); // Добавляем новое сообщение в state
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("clientToServer", onMessage);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("clientToServer", onMessage);
            socket.disconnect();
        };
    }, []);

    function sendMessage() {
        if (!inputRef.current) return;
        const text = inputRef.current.value.trim();
        if (text.length === 0) return;

        const newMessage: MessageReduxState = {
            receiver: {id: 2, type: 'private'},
            message: text,
            senderId: user!.id, // Здесь можно привязать пользователя
            timestamp: new Date().toISOString(),
        };

        socket.emit("clientToServer", newMessage);
        setMessages(prev => [...prev, newMessage]); // Локально добавляем сообщение в state
        inputRef.current.value = ""; // Очищаем поле ввода
    }

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b">Chat</div>
            <div className="flex-1 p-4 overflow-y-auto custom-scroll">
                {messages.length > 0 ? (
                    messages.map((message, key) => (
                        <Message key={key} message={message} />
                    ))
                ) : (
                    <p className="text-gray-500">No messages yet.</p>
                )}
            </div>
            <div className="p-4 flex items-center">
                <Input
                    type="text"
                    ref={inputRef}
                    placeholder="Type a message..."
                    className="flex-1 p-2"
                />
                <Button onClick={sendMessage} className="ml-2">Send</Button>
            </div>
        </div>
    );
}

export default ChatTest;
