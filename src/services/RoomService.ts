import Peer from "peerjs";

//const SESSION_ID_KEY = "planning-poker-session-id";

class RoomService {
  sessionId?: string;
  peer: any;

  constructor() {
    const peer = new Peer({
      host: "localhost",
      port: 9000,
      path: "/planning-poker",
    });
    peer.on("open", function (conn) {
      console.log("new connection", conn);
    });
    peer.on("connection", function (conn) {
      conn.on("open", function () {
        console.log("connected!");
        conn.on("data", function (data) {
          console.log(data);
        });
      });
      conn.on("error", function (err) {
        console.log(err);
      });
      console.log(conn.open + ": remote peer detected: " + conn.peer);
    });
    peer.on("error", function (err) {
      console.log(err);
    });
  }
}

export default RoomService;
