import React from "react";
import { GenericModal } from "../common/GenericModal";

interface StarknetHackthonModalProps {
  open: boolean;
  handleClose: () => void;
}

export const StarknetHackthonModal: React.FC<StarknetHackthonModalProps> = ({
  open,
  handleClose,
}) => {
  const STARKNET_HACKATHON_URL =
    "https://www.hackquest.io/hackathons/Starknet-Hackathon-Re%7Bignite%7D?utm=starklings";

  const handleDontShowAgain = () => {
    localStorage.setItem("starknet_hackathon-modal-dismissed", "true");
    handleClose();
  };

  return (
    <GenericModal
      open={open}
      onClose={handleClose}
      title="Starknet Hackathon"
      subtitle="Starting May 12"
      content="From idea to MVP: Build real solutions, form teams, and compete for prizes."
      primaryButton={{
        text: "Register for Hackathon",
        onClick: () => window.open(STARKNET_HACKATHON_URL, "_blank"),
      }}
      secondaryButton={{
        text: "Don't show again",
        onClick: handleDontShowAgain,
      }}
      imageUrl="/starknet_hackathon.png"
      imageAlt="Starknet Hackathon: Re{ignite}"
    />
  );
};