import React from "react";
import roomStore from "../../../../stores/RoomStore";
import PlayerCard from "../../../../ui/PlayerCard";
import Button from "../../../../ui/Button";
import "./styles.scss";
import { observer } from "mobx-react-lite";

type PlayersTableType = React.FC;

const PlayersTable: PlayersTableType = observer(() => {
  const { isHost, game } = roomStore;
  const { votation, isRevealed = false, votationAverage } = game;
  const leftVote = votation?.votes[0];
  const rightVote = votation?.votes[1];
  const topBottomVotes = votation?.votes.slice(2, votation?.votes.length) || [];
  const middle = Math.floor(topBottomVotes.length / 2);
  const topVotes = topBottomVotes.slice(0, middle) || [];
  const bottomVotes =
    topBottomVotes.slice(middle, votation?.votes.length) || [];

  const toggleReveal = () => {
    roomStore.execRoomAction({ type: "REVEAL_CARDS", value: !isRevealed });
  };

  const startNewVotation = () => {
    roomStore.execRoomAction({ type: "CREATE_NEW_VOTATION", value: null });
  };

  return (
    <div className="players-table-container">
      <div className="left-sit sit-area">
        {leftVote && (
          <PlayerCard
            key={leftVote.player.id}
            name={leftVote.player.name}
            value={leftVote.vote}
            revealed={isRevealed}
            check={!!(leftVote.vote !== null)}
          />
        )}
      </div>
      <div className="right-sit sit-area">
        {rightVote && (
          <PlayerCard
            key={rightVote.player.id}
            name={rightVote.player.name}
            value={rightVote.vote}
            revealed={isRevealed}
            check={!!(rightVote.vote !== null)}
          />
        )}
      </div>
      <div className="top-sit sit-area">
        {topVotes.map((vote) => (
          <PlayerCard
            key={vote.player.id}
            name={vote.player.name}
            value={vote.vote}
            revealed={isRevealed}
            check={!!(vote.vote !== null)}
          />
        ))}
      </div>
      <div className="bottom-sit sit-area">
        {bottomVotes.map((vote) => (
          <PlayerCard
            key={vote.player.id}
            name={vote.player.name}
            value={vote.vote}
            revealed={isRevealed}
            check={!!(vote.vote !== null)}
          />
        ))}
      </div>
      <div className="table-item">
        {isHost && (
          <div className="host-actions">
            {!isRevealed && (
              <Button onClick={toggleReveal}>Reveal Cards</Button>
            )}
            {isRevealed && (
              <>
                <Button onClick={startNewVotation}>Start new votation</Button>
                <div className="votation-result">
                  Average: {Math.round(votationAverage * 100) / 100}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default PlayersTable;
