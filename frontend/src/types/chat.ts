export interface MessageReduxState {
    senderId: number;
    receiver: {id: number, type: "private" | "room"}
    message: string;
    timestamp: string
}

export interface RoomsReduxState {
    id: number
    messages: MessageReduxState[]
    users: { id: number; name: string }[]
    checked: boolean
}