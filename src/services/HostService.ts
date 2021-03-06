import Peer from "peerjs";
import { settings } from "./settings";

class HostService {
  sessionId?: string;
  peer: any;
  peers: Array<string> = [];

  /*Create the peer and wait to be "open"*/
  connect() {
    return new Promise<string>((resolve) => {
      this.peer = new Peer(settings);
      this.peer.on("open", (sessionId: string) => {
        this.sessionId = sessionId;
        resolve(sessionId);
      });
    });
  }

  /*Execute a callback every time fresh data arrives*/
  listen(
    onData: (peer: string, data: any) => void,
    onPeerDisconnect: (peer: string) => void
  ) {
    if (!this.peer)
      throw new Error(
        "Connection must be created before listening to the channel"
      );
    this.peer.on("connection", (connection: any) => {
      this.peers.push(connection);
      connection.on("data", (data: string) => {
        onData(data, connection.peer);
      });
      connection.on("close", () => {
        this.peers = this.peers.filter((peer) => peer !== connection);
        onPeerDisconnect(connection.peer);
      });
    });
  }

  /*Send a message to all the host members*/
  broadcast(message: string) {
    this.peers.forEach((peer: any) => {
      peer.send(message);
    });
  }
}

export default HostService;
