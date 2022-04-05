import React from "react";
import Card from "../../../../ui/Card";
import { VotingScale } from "../../../../models/VotingScale";
import "./styles.scss";

export interface CardValueChooserProps {
  value?: number | null;
  onValueSelected: (value: number) => any;
  scale?: VotingScale;
}

type CardValueChooserType = React.FC<CardValueChooserProps>;

const CardValueChooser: CardValueChooserType = ({
  value,
  onValueSelected,
  scale,
}: CardValueChooserProps) => {
  return (
    <div className="card-value-chooser">
      {scale &&
        scale.value.map((itemValue) => (
          <Card
            key={itemValue}
            value={itemValue}
            revealed
            onClick={() => onValueSelected(itemValue)}
            selected={itemValue === value}
          />
        ))}
    </div>
  );
};

export default CardValueChooser;
