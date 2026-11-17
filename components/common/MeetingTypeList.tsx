"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModel from "./MeetingModel";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const createMeeting = () => {}
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 ">
      <HomeCard
        text="New Meeting"
        description="Start an instant meeting"
        bgColor="#FF742E"
        iconUrl="/icons/add-meeting.svg"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        text="Join Meeting"
        description="Join via invitation link"
        bgColor="#0E78F9"
        iconUrl="/icons/join-meeting.svg"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        text="Schedule Meeting"
        description="Plan your meeting"
        bgColor="#830EF9"
        iconUrl="/icons/schedule.svg"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        text="View Recordings"
        description="View meeting recordings"
        bgColor="#F9A90E"
        iconUrl="/icons/recordings.svg"
        handleClick={() => router.push("/recordings")}
      />
      <MeetingModel
        onOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
