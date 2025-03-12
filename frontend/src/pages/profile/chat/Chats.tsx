import { useEffect } from "react";
import { socket } from "@/socket.ts";
import {addMessage, setCurrentRoom} from "@/store/roomsSlice.ts";
import {MessageReduxState, RoomsReduxState} from "@/types/chat.ts";
import store, { RootState } from "@/store/store.ts";
import { useSelector } from "react-redux";
import Error from "@/pages/Error.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import Chat from "@/components/chat/Chat.tsx";

function generateRandomRooms(numRooms: number): RoomsReduxState[] {
    const rooms: RoomsReduxState[] = [];
    const commonUser = {id: 1, name: 'Roma'}; // Один общий пользователь для всех комнат

    for (let i = 0; i < numRooms; i++) {
        const randomUser = generateRandomUsers(1)[0];
        const room: RoomsReduxState = {
            id: i + 1,
            messages: shuffleArray(generateRandomMessages(20, commonUser.id).concat(generateRandomMessages(20, randomUser.id))) , // Генерация минимум 50 сообщений
            users: [randomUser, commonUser], // Один и тот же пользователь в каждой комнате
            checked: Math.random() > 0.5, // Случайное состояние checked
        };
        rooms.push(room);
    }

    return rooms;
}

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Случайный индекс от 0 до i
        [array[i], array[j]] = [array[j], array[i]]; // Обмен местами
    }
    return array;
}

function generateRandomMessages(numMessages: number, senderId: number): MessageReduxState[] {
    const messages: MessageReduxState[] = [];
    for (let i = 0; i < numMessages; i++) {
        const message: MessageReduxState = {
            message: `Message #${i + 1}`, // Пример осмысленного сообщения
            senderId: senderId, // Все сообщения от одного пользователя
            receiver: {id: 1, type: "room"}, // Указываем ID комнаты (можно подстроить под каждый случай)
            timestamp: new Date().toISOString(), // Время отправки сообщения
        };
        messages.push(message);
    }
    return messages;
}

function generateRandomUsers(numUsers: number): { id: number; name: string }[] {
    const users: { id: number; name: string }[] = [];
    for (let i = 0; i < numUsers; i++) {
        const user = {
            id: i + 2,
            name: `User ${i + 2}`,
        };
        users.push(user);
    }
    return users;
}

// Генерация 20 комнат с одинаковым пользователем и 50 сообщениями в каждой
const roomsq = generateRandomRooms(20);


function Chats() {
    const { rooms, currentRoomId, error, loading } = useSelector((state: RootState) => state.chatData);
    const authData = useSelector((state: RootState) => state.authData);

    useEffect(() => {
        socket.connect();

        function onConnect() {
            console.log("Connected");
        }

        function onDisconnect() {
            console.log("Disconnected");
        }

        function onMessage(value: MessageReduxState) {
            const room = rooms.find(room => room.id === value.receiver.id)
            if(room) {
                store.dispatch(addMessage(value));
            } else {
                store.dispatch(fetchRoom(value.newRoom!));
            }
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("message", onMessage);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("message", onMessage);
            socket.disconnect();
        };
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <Error message={error} />;

    return (
        <div className="flex h-full gap-2">
            {/* Sidebar */}
            <div className="w-1/4 p-4 border-r border-gray-300 flex flex-col">
                <h2 className="text-lg font-bold mb-4">Chats</h2>
                <div className="flex-1 overflow-y-auto custom-scroll pr-6">
                    <div className="space-y-2">
                        {roomsq.map((room) => (
                            <Button onClick={() => store.dispatch(setCurrentRoom(room.id))} key={room.id} variant={room.id === currentRoomId ? "default" : "outline"}
                                    className="w-full">
                                {
                                    room.users.find(user => user.id != 1 || authData.user?.id)?.name
                                }
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex items-center justify-center">
                {currentRoomId === 0 ? (
                    <p className="text-gray-500">Select a chat to start messaging</p>
                ) : (
                    <Card className="w-full h-full flex flex-col">
                        <Chat roomId={currentRoomId} messages = {roomsq.find((room) => room.id === currentRoomId)!.messages} />
                    </Card>
                )}
            </div>
        </div>

    );
}

export default Chats;