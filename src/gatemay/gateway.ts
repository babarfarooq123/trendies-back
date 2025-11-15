import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server} from "socket.io";


@WebSocketGateway({
    cors: {
        origin: "*",
    },
})
export class EventsGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {
            // console.log('New client connected:', socket);
            console.log("User connected to WebSocket server");
        })
    }

    @SubscribeMessage('1')
    onNewMessageFrom1(@MessageBody() body: any): void {
        console.log('Received message 1->2:', body);

        this.server.emit('2', {
            msg: 'New message',
            content: body
        });
    }

    @SubscribeMessage('2')
    onNewMessageFrom2(@MessageBody() body: any): void {
        console.log('Received message 2->1:', body);

        this.server.emit('1', {
            content: body
        });
    }

    @SubscribeMessage('route-message-to-user')
    onNewMessageRoute(@MessageBody() body: any): void {
        console.log(`Received message ${body.senderEmail}->${body.recieverEmail}:`, body);

        this.server.emit(body.recieverEmail, {
            content: body
        });
    }
}