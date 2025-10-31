import {WebSocketServer} from "ws";
const wss  =new WebSocketServer({port:8080});
interface User{
    socket: WebSocket;
    name: string;

}
let allSockets: User[]=[];
wss.on("connection",(socket)=>{
    socket.on("message",(message)=>{
        //@ts-ignore
        const parsedMessage=JSON.parse(message);

    })
})
