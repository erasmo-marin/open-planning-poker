import React from "react";
import { observer } from "mobx-react-lite";
import GameStore from "../../stores/Game";
import CardValueChooser from "../../components/CardValueChooser";
import PlayersTable from "../../components/PlayersTable";
import "./styles.scss";

const Board = observer(() => {
  const { votation, hostId } = GameStore;

  return (
    <main className="main-board">
      {hostId && <div className="share-link">Share this room: {hostId}</div>}
      <section className="board-table-container">
        <PlayersTable votation={votation} />
      </section>
      <section className="board-voting-container">
        <CardValueChooser scale={votation?.scale} />
      </section>
    </main>
  );
});

export default Board;
