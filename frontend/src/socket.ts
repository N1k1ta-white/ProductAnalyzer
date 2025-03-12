import { io } from 'socket.io-client';
const URL = process.env.NODE_ENV === 'production' ? undefined : import.meta.env.VITE_API_URL;

export const socket = io(URL, {
    autoConnect: false,
    reconnectionAttempts: 5, // Количество попыток переподключения
    reconnectionDelay: 2000,  // Задержка перед попыткой (в мс)
    timeout: 5000,
    extraHeaders: {
        authorization: localStorage.getItem("token") || ""
    }
});