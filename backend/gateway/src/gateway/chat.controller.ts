import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { chatWithLLM } from 'src/util/openAi';

@WebSocketGateway({ cors: { origin: "http://localhost:3000" } })
export class ChatGateway {

    constructor(private jwtService: JwtService) {}

    @WebSocketServer()
    private server: Server;

    private users: Map<number, string> = new Map();

    // @SubscribeMessage('clientToServer')
    // handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): void {
    //     if (message !== "putin") {
    //         this.server.emit('serverToClient', "⚠️ 🏛️ 📜 🚫 ✡️ 😢 🚂➡️🏚️ 🔫💣 ☠️ 😭 🔥💀⚰️ 🏚️ 🏴‍☠️ 😨 🩸  🕯️ 🙏 6️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣ ⚖️ 🎖️  🕊️ 🏳️ ✡️ 😔");
    //         return;
    //     }
    //     this.server.emit('serverToClient', "SLAVA UKRAINI");
    // }

    @SubscribeMessage('clientToServer')
    async handleMessage(@MessageBody() body: {receiver: {id : number, type : string}, message : string, 
        senderId: number, timestamp: string}, @ConnectedSocket() client: Socket) : Promise<void> {
        
        // let receiverId = body.receiver.id;
        // let receiverId = 58;
        // let receiverSocketId = this.users.get(receiverId);
        // if (receiverSocketId) {
            // client.emit('serverToClient', body);
            // client.broadcast.emit('serverToClient', body);
            const ans = await chatWithLLM(body.message);
            console.log(typeof ans);
            console.log('ANSWER:', ans);
            client.emit('serverToClient', {receiver: {id: body.senderId, type: 'private'}, message: ans, senderId: 1, timestamp: new Date().toISOString()});
        // } //else {
        //     console.log('User not found:', receiverId);
        //     client.emit('serverToClient', { error: 'User not found', originalMessage: body });
        // }
    }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
        const jwt = client.handshake.headers.authorization ?? "";
        // TODO: check if jwt is valid or not null
        let {id, ...rest} = this.jwtService.decode(jwt);
        console.log('Connection:', id);
        this.users.set(id, client.id);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }
}
