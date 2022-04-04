import React from "react";
import classnames from "classnames";
import "./styles.scss";

export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

type ButtonType = React.FC<ButtonProps>;

const Button: ButtonType = ({
  onClick,
  disabled = false,
  className,
  children,
}: ButtonProps) => {
  const classes = classnames("button", className);
  return (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
