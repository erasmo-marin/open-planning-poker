import React from "react";
import { useTranslation } from "react-i18next";
import roomStore from "../../../../stores/RoomStore";
import PlayerCard from "../../../../ui/PlayerCard";
import Button from "../../../../ui/Button";
import "./styles.scss";
import { observer } from "mobx-react-lite";

type PlayersTableType = React.FC;

const PlayersTable: PlayersTableType = observer(() => {
  const { t } = useTranslation();
  const { isHost, game } = roomStore;
  const { votation, votationAverage, validVotesCount } = game;
  const leftVote = votation?.votes[0];
  const rightVote = votation?.votes[1];
  const topBottomVotes = votation?.votes.slice(2, votation?.votes.length) || [];
  const middle = Math.floor(topBottomVotes.length / 2);
  const topVotes = topBottomVotes.slice(0, middle) || [];
  const bottomVotes =
    topBottomVotes.slice(middle, votation?.votes.length) || [];

  const finishVotation = () => {
    roomStore.execRoomAction({ type: "FINISH_VOTATION", value: null });
  };

  const startNewVotation = () => {
    roomStore.execRoomAction({ type: "CREATE_NEW_VOTATION", value: null });
  };

  const votationIsFinished = votation?.state === "FINISHED";

  return (
    <div className="players-table-container">
      <div className="left-sit sit-area">
        {leftVote && (
          <PlayerCard
            key={leftVote.player.id}
            name={leftVote.player.name}
            value={leftVote.vote}
            revealed={votationIsFinished}
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
            revealed={votationIsFinished}
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
            revealed={votationIsFinished}
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
            revealed={votationIsFinished}
            check={!!(vote.vote !== null)}
          />
        ))}
      </div>
      <div className="table-item">
        <div className="host-actions">
          {!votationIsFinished && isHost && (
            <Button disabled={validVotesCount === 0} onClick={finishVotation}>
              {t("Reveal Cards")}
            </Button>
          )}
          {votationIsFinished && (
            <>
              {isHost && (
                <Button onClick={startNewVotation}>
                  {t("Start new votation")}
                </Button>
              )}
              <div className="votation-result">
                {t("Average: {{average}}", {
                  average: Math.round(votationAverage * 100) / 100,
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default PlayersTable;
