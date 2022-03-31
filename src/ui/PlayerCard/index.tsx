import React from "react";
import Card from "../Card";
import "./styles.scss";

export interface PlayerCardProps {
  value: number;
  revealed?: boolean;
  name: string;
}

type PlayerCardType = React.FC<PlayerCardProps>;

const PlayerCard: PlayerCardType = ({
  name,
  value,
  revealed = true,
}: PlayerCardProps) => {
  return (
    <div className="planning-player-card">
      <Card value={value} revealed={revealed} selected={false} />
      <p>{name}</p>
    </div>
  );
};

export default PlayerCard;
