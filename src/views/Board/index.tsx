import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import roomStore from "../../stores/RoomStore";
import gameStore from "../../stores/GameStore";
import CardValueChooser from "./components/CardValueChooser";
import PlayersTable from "./components/PlayersTable";
import "./styles.scss";

const Board = observer(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomIdFromParams = urlParams.get("roomId");
  const { roomId, connected } = roomStore;
  const { votation } = gameStore;

  useEffect(() => {
    if (roomIdFromParams && !roomStore.client) {
      roomStore.initClient(roomIdFromParams);
    } else if (!roomIdFromParams && !roomStore.host) {
      roomStore.initHost();
    }
    if (connected) {
      const name = window.prompt("Enter your name", "") || "Anonymous";
      const player = { name, id: name };
      gameStore.setMe(player);
      roomStore.execRoomAction({ type: "ADD_PLAYER", value: player });
    }
  }, [connected, roomIdFromParams]);

  const sendVote = (value: number) => {
    roomStore.execRoomAction({
      type: "VOTE",
      value: {
        player: gameStore.me,
        vote: value,
      },
    });
  };

  return (
    <main className="main-board">
      {roomId && (
        <div className="share-link">
          Share this room: {window.location.host + "?roomId=" + roomId}
        </div>
      )}
      <section className="board-table-container">
        <PlayersTable />
      </section>
      <section className="board-voting-container">
        <CardValueChooser scale={votation?.scale} onValueSelected={sendVote} />
      </section>
    </main>
  );
});

export default Board;
