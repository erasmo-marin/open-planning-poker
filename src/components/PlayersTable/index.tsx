import React, { useState } from "react";
import { Votation } from "../../models/Votation";
import PlayerCard from "../../ui/PlayerCard";
import Button from "../../ui/Button";
import "./styles.scss";

export interface PlayersTableProps {
  votation?: Votation;
}

type PlayersTableType = React.FC<PlayersTableProps>;

const PlayersTable: PlayersTableType = ({ votation }: PlayersTableProps) => {
  const [revealed, setRevealed] = useState(false);

  const leftVote = votation?.votes[0];
  const rightVote = votation?.votes[1];
  const topBottomVotes = votation?.votes.slice(2, votation?.votes.length) || [];

  const middle = Math.floor(topBottomVotes.length / 2);

  const topVotes = topBottomVotes.slice(0, middle) || [];
  const bottomVotes =
    topBottomVotes.slice(middle, votation?.votes.length) || [];

  return (
    <div className="players-table-container">
      <div className="left-sit sit-area">
        {leftVote && (
          <PlayerCard
            key={leftVote.player.id}
            name={leftVote.player.name}
            value={leftVote.vote}
            revealed={revealed}
          />
        )}
      </div>
      <div className="right-sit sit-area">
        {rightVote && (
          <PlayerCard
            key={rightVote.player.id}
            name={rightVote.player.name}
            value={rightVote.vote}
            revealed={revealed}
          />
        )}
      </div>
      <div className="top-sit sit-area">
        {topVotes.map((vote) => (
          <PlayerCard
            key={vote.player.id}
            name={vote.player.name}
            value={vote.vote}
            revealed={revealed}
          />
        ))}
      </div>
      <div className="bottom-sit sit-area">
        {bottomVotes.map((vote) => (
          <PlayerCard
            key={vote.player.id}
            name={vote.player.name}
            value={vote.vote}
            revealed={revealed}
          />
        ))}
      </div>
      <div className="table-item sit-area">
        <Button onClick={() => setRevealed(!revealed)}>Reveal Cards</Button>
      </div>
    </div>
  );
};

export default PlayersTable;
