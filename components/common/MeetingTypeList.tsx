"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "@/components/ui/toast";
import { Textarea } from "../ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "../ui/input";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;
    const isInstant = meetingState === "isInstantMeeting";

    try {
      if (!values.dateTime) {
        toast.add({
          type: "warning",
          description: "Please select a date and a time.",
          priority: "high",
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call.");

      const startsAt = values.dateTime.toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: { description },
        },
      });

      setCallDetails(call);

      if (isInstant) {
        setMeetingState(undefined);
        router.push(`/meeting/${call.id}`);
      }
      toast.add({
        type: "success",
        description: "The meeting is created",
        priority: "high",
      });
    } catch (error) {
      console.log(error);
      setMeetingState(undefined);
      toast.add({
        type: "error",
        description: "Failed to create Meeting",
        priority: "high",
      });
    }
  };
  const closeScheduleModal = () => {
    setMeetingState(undefined);
    setCallDetails(undefined); // so the next open shows the create form again
    setValues({ dateTime: new Date(), description: "", link: "" });
  };

  const meetingLink = callDetails
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/meeting/${callDetails.id}`
    : "";
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
        text="Schedule Meeting"
        description="Plan your meeting"
        bgColor="#830EF9"
        iconUrl="/icons/schedule.svg"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        text="Join Meeting"
        description="Join via invitation link"
        bgColor="#0E78F9"
        iconUrl="/icons/join-meeting.svg"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />

      <HomeCard
        text="View Recordings"
        description="View meeting recordings"
        bgColor="#F9A90E"
        iconUrl="/icons/recordings.svg"
        handleClick={() => router.push("/recordings")}
      />
      {!callDetails ? (
        <MeetingModel
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={closeScheduleModal}
          title="Create Meeting"
          className=""
          handleClick={createMeeting}>
          <div className="flex flex-col gap-3">
            <label className="text-base text-normal leading-[22px]">
              Add a description
            </label>
            <Textarea
              className="border-none bg-accent focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <label className="text-base text-normal leading-[22px]">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date: Date | null) =>
                setValues({ ...values, dateTime: date! })
              }
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy  h:mm aa"
              className="w-full rounded bg-muted p-2 focus:outline-none"
            />
          </div>
        </MeetingModel>
      ) : (
        <MeetingModel
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={closeScheduleModal}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.add({ type: "success", description: "Link Copied" });
            closeScheduleModal(); // remove this line if you want it to stay open after copying
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}
      <MeetingModel
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingModel
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => {
          router.push(values.link);
        }}>
        <Input
          placeholder="Meeting Link"
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModel>
    </section>
  );
};

export default MeetingTypeList;
