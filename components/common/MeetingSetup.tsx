"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const call = useCall();

  if (!call) {
    throw new Error("useCall must be used within StreamCall Component");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      // true = fully stop the tracks, not just mute them
      call.camera.disable(true).catch(() => {});
      call.microphone.disable(true).catch(() => {});
    } else {
      call.camera.enable().catch(() => {});
      call.microphone.enable().catch(() => {});
    }
  }, [isMicCamToggledOn, call]);

  const handleJoin = async () => {
    try {
      setIsJoining(true);
      await call.join();
      setIsSetupComplete(true);
    } catch (error) {
      console.error("Failed to join call", error);
      setIsJoining(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 text-foreground">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          <span className="text-sm">Join with mic and camera off</span>
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500/50 px-6 py-6 text-lg"
        disabled={isJoining}
        onClick={handleJoin}>
        {isJoining ? "Joining..." : "Join Meeting"}
      </Button>
    </div>
  );
};

export default MeetingSetup;