import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";
import roomStore from "../../stores/RoomStore";
import gameStore from "../../stores/GameStore";
import CardValueChooser from "./components/CardValueChooser";
import PlayersTable from "./components/PlayersTable";
import ShareButton from "./components/ShareButton";
import Spinner from "../../ui/Spinner";
import logo from "../../assets/logo.png";
import "./styles.scss";
import RegisterModal from "./components/RegisterModal";

const Board = observer(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomIdFromParams = urlParams.get("roomId");
  const { roomId, connected, sessionId } = roomStore;
  const { votation, players, me, myVote } = gameStore;

  useEffect(() => {
    if (roomIdFromParams && !roomStore.client) {
      roomStore.initClient(roomIdFromParams);
    } else if (!roomIdFromParams && !roomStore.host) {
      roomStore.initHost();
    }
  }, [connected, roomIdFromParams]);

  const onRegister = (name: string) => {
    if (!sessionId) throw new Error("Can not register without a session Id");
    const player = { name, id: sessionId };
    gameStore.setMe(player);
    roomStore.execRoomAction({ type: "ADD_PLAYER", value: player });
  };

  const sendVote = (value: number) => {
    if (votation?.state === "FINISHED") return;
    roomStore.execRoomAction({
      type: "VOTE",
      value: {
        player: gameStore.me,
        vote: value,
      },
    });
  };

  const classes = classnames("main-board", { loading: !connected });

  const url =
    window.location.protocol +
    "//" +
    window.location.host +
    "?roomId=" +
    roomId;

  return (
    <main className={classes}>
      <img alt="logo" src={logo} className="logo" />
      {connected && <RegisterModal open={!me} onRegister={onRegister} />}
      {connected && me && players.length > 0 ? (
        <>
          {roomId && <ShareButton link={url} />}
          <section className="board-table-container">
            <PlayersTable />
          </section>
          <section className="board-voting-container">
            <CardValueChooser
              value={myVote}
              scale={votation?.scale}
              onValueSelected={sendVote}
            />
          </section>
        </>
      ) : !connected ? (
        <Spinner />
      ) : null}
    </main>
  );
});

export default Board;
