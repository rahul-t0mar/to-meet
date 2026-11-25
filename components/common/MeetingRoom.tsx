import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { cn } from "cn";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";
import { releaseDevices } from "@/lib/releaseDevices";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const call = useCall();
  const router = useRouter();

  // All hooks must stay ABOVE any early return
  useEffect(() => {
    if (callingState !== CallingState.LEFT || !call) return;

    // Fully stop the tracks so the browser's mic indicator turns off
    call.microphone.disable(true).catch(() => {});
    call.camera.disable(true).catch(() => {});
  }, [callingState, call]);

  if (callingState !== CallingState.JOINED) return <Loader />;

  const renderCallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-foreground">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          {renderCallLayout()}
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls
          onLeave={async () => {
            await releaseDevices(call);
            router.push("/");
          }}
        />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger
              className={`cursor-pointer rounded-2xl px-4 py-2 bg-muted hover:bg-muted-foreground/35`}>
              <LayoutList size={20} />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            {[
              { label: "Grid", value: "grid" },
              { label: "Speaker-Left", value: "speaker-left" },
              { label: "Speaker-Right", value: "speaker-right" },
            ].map(({ label, value }) => (
              <div key={value}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setLayout(value as CallLayoutType);
                  }}>
                  {label}
                </DropdownMenuItem>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button
          type="button"
          aria-label="Show participants"
          onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-xl bg-muted px-4 py-2 hover:bg-muted-foreground/35">
            <Users size={20} />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
