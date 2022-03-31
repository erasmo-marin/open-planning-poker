import React from "react";
import classnames from "classnames";
import "./styles.scss";

export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

type ButtonType = React.FC<ButtonProps>;

const Button: ButtonType = ({ onClick, children }: ButtonProps) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
