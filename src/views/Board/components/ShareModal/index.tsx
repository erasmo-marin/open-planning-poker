import React, { useState, useRef } from "react";
import Modal from "react-modal";
import Button from "../../../../ui/Button";
import "./styles.scss";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

interface ShareModalProps {
  link: string;
  open: boolean;
  onClose?: () => any;
  onRequestClose?: () => any;
}

const ShareModal: React.FC<ShareModalProps> = ({
  link,
  open,
  onRequestClose,
}) => {
  const linkInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    const copyText = linkInputRef.current;
    if (!copyText) return;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Modal
      isOpen={open}
      contentLabel="Share this"
      className="share-modal"
      onRequestClose={onRequestClose}
      shouldCloseOnEsc
      shouldFocusAfterRender
      shouldReturnFocusAfterClose
    >
      <h2>Invite Players</h2>
      <p>Share this url to your teammates</p>
      <input className="share-link" value={link} ref={linkInputRef} />
      <Button onClick={copyToClipboard}>
        {copied ? "Copied!" : "Copy to clipboard"}
      </Button>
    </Modal>
  );
};

export default ShareModal;
