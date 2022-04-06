import React, { useState, useRef } from "react";
import Modal from "../../../../ui/Modal";
import Button from "../../../../ui/Button";
import "./styles.scss";

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

  const copyToClipboard = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      open={open}
      contentLabel="Share this"
      className="share-modal"
      onRequestClose={onRequestClose}
    >
      <form onSubmit={copyToClipboard}>
        <h2 className="title">Invite Players</h2>
        <p className="description">Share this url to your teammates</p>
        <input
          className="share-link"
          value={link}
          ref={linkInputRef}
          readOnly
        />
        <Button type="submit" autoFocus>
          {copied ? "Copied!" : "Copy to clipboard"}
        </Button>
      </form>
    </Modal>
  );
};

export default ShareModal;
