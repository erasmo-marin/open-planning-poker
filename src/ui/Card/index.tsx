import React from "react";
import classnames from "classnames";
import CheckIcon from "../../ui/CheckIcon";
import "./styles.scss";

export interface CardProps {
  value: number | null;
  revealed?: boolean;
  selected?: boolean;
  check?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

type CardType = React.FC<CardProps>;

const Card: CardType = ({
  value,
  revealed = true,
  selected = false,
  check = false,
  onClick,
}: CardProps) => {
  const classes = classnames("planning-card", { revealed, selected });

  return (
    <article className={classes} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          {value !== null && <div className="card-value">{value}</div>}
        </div>
        <div className="card-back" />
      </div>
      {check && (
        <div className="check-icon-container">
          <CheckIcon />
        </div>
      )}
    </article>
  );
};

export default Card;
