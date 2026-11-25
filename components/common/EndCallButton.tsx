"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { releaseDevices } from "@/lib/releaseDevices";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button
      onClick={async () => {
        await call.endCall();
        await call.leave().catch(() => {}); // may already be left
        await releaseDevices(call);
        router.replace("/");
      }}
      className="bg-red-500 hover:bg-red-500/60">
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
