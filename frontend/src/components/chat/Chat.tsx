import {useEffect, useState} from "react";
import {socket} from "@/socket.ts";
import {Button} from "@/components/ui/button.tsx";
import store, {RootState} from "@/store/store.ts";
import {addMessage, setCurrentRoom} from "@/store/roomsSlice.ts";
import {useSelector} from "react-redux";
import Message from "@/components/chat/Message.tsx";
import {Input} from "@/components/ui/input.tsx";
import {MessageReduxState} from "@/types/chat.ts";

interface Props {
    roomId: number;
    messages: MessageReduxState[];
}
function Chat({ roomId, messages }: Props) {
    const [message, setMessage] = useState("");
    const { user } = useSelector((state: RootState) => state.authData);
    useEffect(() => {
        return () => {
            store.dispatch(setCurrentRoom(0))
        }
    }, []);

    useEffect(() => {
        socket.emit("joinRoom", roomId);
        store.dispatch(setCurrentRoom(roomId))

        return () => {
            socket.emit("leaveRoom", roomId);
        };
    }, [roomId])

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("message", { roomId, text: message }, (response: { success: boolean }) => {
                if (response.success) {
                    store.dispatch(addMessage({
                        receiver: {id: roomId, type: "room"},
                        senderId: user!.id,
                        message: message,
                        timestamp: new Date().toISOString(),
                    }));
                } else {
                    console.error("Ошибка отправки сообщения");
                }
            });
        }
    };

     return (
         <>
             <div className="p-4 border-b">Chat Room {roomId}</div>
             <div className="flex-1 p-4 overflow-y-auto custom-scroll">
                 {messages && messages.length > 0 && (
                     messages.map((message, key) => (
                        <Message key={key} message={message} />
                     ))
                 )}
             </div>
             <div className="p-4 flex items-center">
                 <Input
                     type="text"
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     placeholder="Type a message..."
                     className="flex-1 p-2"
                 />
                 <Button onClick={sendMessage} className="ml-2">Send</Button>
             </div>
         </>
     );
}

export default Chat;