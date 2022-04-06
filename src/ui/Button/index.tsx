import React from "react";
import classnames from "classnames";
import "./styles.scss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

type ButtonType = React.FC<ButtonProps>;

const Button: ButtonType = ({ className, children, ...rest }: ButtonProps) => {
  const classes = classnames("button", className);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
