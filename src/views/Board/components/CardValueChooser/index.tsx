import React, { useState } from "react";
import Card from "../../../../ui/Card";
import { VotingScale } from "../../../../models/VotingScale";
import "./styles.scss";

export interface CardValueChooserProps {
  onValueSelected?: (value: number) => any;
  scale?: VotingScale;
}

type CardValueChooserType = React.FC<CardValueChooserProps>;

const CardValueChooser: CardValueChooserType = ({
  onValueSelected,
  scale,
}: CardValueChooserProps) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const _onValueSelected = (value: number) => {
    setSelectedValue(value);
    onValueSelected && onValueSelected(value);
  };

  return (
    <div className="card-value-chooser">
      {scale &&
        scale.value.map((value) => (
          <Card
            key={value}
            value={value}
            revealed
            onClick={() => _onValueSelected(value)}
            selected={value === selectedValue}
          />
        ))}
    </div>
  );
};

export default CardValueChooser;
