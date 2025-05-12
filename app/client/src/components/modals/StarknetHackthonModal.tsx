import React from "react";
import { GenericModal, GenericModalProps } from "../common/GenericModal";

type StarknetHackthonModalProps = Pick<GenericModalProps, "open" | "handleClose">;

export const StarknetHackthonModal: React.FC<StarknetHackthonModalProps> = ({
  open,
  handleClose,
}) => {
  return (
    <GenericModal
      open={open}
      handleClose={handleClose}
      image_src="/starknet_hackathon.png"
      image_alt="Starknet Hackathon: Re{ignite}"
      title="Starknet Hackathon"
      date="Starting May 12"
      description="From idea to MVP: Build real solutions, form teams, and compete for prizes."
      button_text="Register for Hackathon"
      button_link="https://www.hackquest.io/hackathons/Starknet-Hackathon-Re%7Bignite%7D?utm=starklings"
    />
  );
};