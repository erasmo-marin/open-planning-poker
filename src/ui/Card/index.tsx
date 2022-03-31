import React from "react";
import classnames from "classnames";
import "./styles.scss";

export interface CardProps {
  value: number;
  revealed?: boolean;
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

type CardType = React.FC<CardProps>;

const Card: CardType = ({
  value,
  revealed = true,
  selected = false,
  onClick,
}: CardProps) => {
  const classes = classnames("planning-card", { revealed, selected });

  return (
    <article className={classes} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          <div className="card-value">{value}</div>
        </div>
        <div className="card-back" />
      </div>
    </article>
  );
};

export default Card;
