"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/node-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { toast } from "../ui/toast";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endedCalls, upcomingCalls, CallRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recordings":
        return recordings;
      default:
        return [];
    }
  };
  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No previous calls found!";
      case "upcoming":
        return "No upcoming calls found!";
      case "recordings":
        return "No recordings found!";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          CallRecordings.map((meeting) => meeting.queryRecordings()),
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast.add({
          type: "error",
          description: "Too many requests.Please Try again later",
        });
      }
    };

    if (type === "recordings") fetchRecordings();
  }, [type, CallRecordings]);
  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => {
          const isRecording = type === "recordings";
          const call = meeting as Call;
          const recording = meeting as CallRecording;

          return (
            <MeetingCard
              key={isRecording ? recording.filename : call.id}
              icon={
                type === "ended"
                  ? "/icons/previous.svg"
                  : type === "upcoming"
                    ? "/icons/upcoming.svg"
                    : "/icons/recording.svg"
              }
              title={
                isRecording
                  ? recording.filename?.substring(0, 20)
                  : call.state?.custom?.description?.substring(0, 30) ||
                    meeting.filename?.substring(0, 20) ||
                    "Personal Meeting"
              }
              date={
                isRecording
                  ? new Date(recording.start_time).toLocaleString()
                  : call.state?.startsAt?.toLocaleString() || ""
              }
              isPreviousMeeting={type === "ended"}
              buttonIcon1={isRecording ? "/icons/play.svg" : undefined}
              buttonText={isRecording ? "Play" : "Start"}
              handleClick={() =>
                router.push(isRecording ? recording.url : `/meeting/${call.id}`)
              }
              link={
                isRecording
                  ? recording.url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`
              }
            />
          );
        })
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
