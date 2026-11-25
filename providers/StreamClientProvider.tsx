"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/common/Loader";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

type StreamUser = { id: string; name: string; image?: string };

const StreamClientInner = ({ user, children }: { user: StreamUser; children: ReactNode }) => {
  if (!apiKey) throw new Error("Stream API key missing");

  const [client] = useState(() => new StreamVideoClient(apiKey));

  useEffect(() => {
    client.connectUser(user, tokenProvider).catch(console.error);
    return () => {
      client.disconnectUser().catch(console.error);
    };
  }, [client, user.id, user.name, user.image]);

  return <StreamVideo client={client}>{children}</StreamVideo>;
};

const StreamClientProvider = ({
  user,
  children,
}: {
  user: StreamUser;
  children: ReactNode;
}) => (
  <StreamClientInner key={user.id} user={user}>
    {children}
  </StreamClientInner>
);

export default StreamClientProvider;
