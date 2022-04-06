import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ShareIcon from "../../../../ui/ShareIcon";
import Button from "../../../../ui/Button";
import ShareModal from "../ShareModal";
import "./styles.scss";

interface ShareButtonProps {
  link: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ link }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button className="share-button" onClick={openModal}>
        <ShareIcon />
        {t("Share this room")}
      </Button>
      <ShareModal link={link} open={open} onRequestClose={closeModal} />
    </>
  );
};

export default ShareButton;
