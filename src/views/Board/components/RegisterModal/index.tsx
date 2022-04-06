import React, { useState } from "react";
import Modal from "../../../../ui/Modal";
import Button from "../../../../ui/Button";
import "./styles.scss";

interface RegisterModalProps {
  open: boolean;
  onRegister: (name: string) => any;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onRegister }) => {
  const [name, setName] = useState<string>();

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const _onRegister = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (name) onRegister(name);
  };

  return (
    <Modal open={open} contentLabel="Share this" className="register-modal">
      <form onSubmit={_onRegister}>
        <h2 className="title">Your display name</h2>
        <p className="description">
          This is the name you will be using in the game.
        </p>
        <input
          className="name-input"
          onChange={onNameChange}
          placeholder="John Doe"
        />
        <Button type="submit" disabled={!name}>
          Continue to game
        </Button>
      </form>
    </Modal>
  );
};

export default RegisterModal;
