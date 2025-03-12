import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMessage, IRoom} from "@/types/chat.ts";

interface State {
    rooms: IRoom[];
    currentRoomId: number
    loading: boolean;
    error: string | null;
}

const initialState: State = {
    rooms: [],
    currentRoomId: 1,
    loading: false,
    error: null,
}


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        updateError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateRooms: (state, action: PayloadAction<IRoom[]>) => {
            state.rooms = action.payload; // Полностью заменяет список комнат
        },
        addRoom: (state, action: PayloadAction<IRoom>) => {
            state.rooms.push(action.payload);
        },
        addMessage: (state, action: PayloadAction<IMessage>) => {
            const room = state.rooms.find(room => room.id === action.payload.roomId);
            room!.messages = [...room!.messages, action.payload];
            room!.checked = state.currentRoomId === room!.id;
        },
        setCurrentRoom: (state, action: PayloadAction<number>) => {
            state.currentRoomId = action.payload;
        },

    }
})

export const { updateError, updateRooms, addRoom, addMessage, setCurrentRoom  } = chatSlice.actions;
export default chatSlice.reducer;