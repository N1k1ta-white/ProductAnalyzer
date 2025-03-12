export interface IMessage {
    id?: number
    newRoom?: IRoom; //если это первое сообщение в чате (чат только создан и серв должен вернуть мне его)
    roomId: number;
    senderId: number;
    message: string;
    timestamp: string
}
export interface IRoom {
    id: number
    messages: IMessage[]
    users: { id: number; name: string }[]
    checked: boolean
}