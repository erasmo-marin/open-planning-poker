import Peer from "peerjs";
import { settings } from "./settings";

class ClientService {
  sessionId?: string;
  peer: any;
  connection: any;

  connect(roomId: string, callback: (data: any) => void) {
    return new Promise((resolve) => {
      this.peer = new Peer(settings);
      this.peer.on("open", (sessionId: string) => {
        this.sessionId = sessionId;
        this.connection = this.peer.connect(roomId);
        this.connection.on("data", (data: string) => {
          callback(data);
        });
        this.connection.on("open", () => {
          resolve(sessionId);
        });
      });
    });
  }

  send(message: string) {
    if (!this.connection)
      throw new Error("Connection must be stablished before sending a message");
    this.connection.send(message);
  }
}

export default ClientService;
