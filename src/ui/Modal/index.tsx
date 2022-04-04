import React from "react";
import BaseModal from "react-modal";
import classnames from "classnames";
import "./styles.scss";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
BaseModal.setAppElement("#root");

interface ModalProps {
  open: boolean;
  onClose?: () => any;
  onRequestClose?: () => any;
  children?: React.ReactNode;
  className?: string;
  contentLabel: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onRequestClose,
  children,
  className,
}) => {
  const classes = classnames("modal", className);

  return (
    <BaseModal
      isOpen={open}
      contentLabel="Share this"
      className={classes}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc
      shouldFocusAfterRender
      shouldReturnFocusAfterClose
    >
      {children}
    </BaseModal>
  );
};

export default Modal;
