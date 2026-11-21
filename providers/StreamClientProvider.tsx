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

  // No user passed, so nothing connects (or calls the server action) during render
  const [client] = useState(() => new StreamVideoClient(apiKey));
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let cancelled = false;

    client
      .connectUser(user, tokenProvider)
      .then(() => {
        if (!cancelled) setConnected(true);
      })
      .catch(console.error);

    return () => {
      cancelled = true;
      setConnected(false);
      client.disconnectUser().catch(console.error);
    };
  }, [client, user.id, user.name, user.image]);

  if (!connected) return <Loader />;

  return <StreamVideo client={client}>{children}</StreamVideo>;
};

const StreamClientProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) return <Loader />;

  return (
    <StreamClientInner
      key={user.id}
      user={{
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      }}
    >
      {children}
    </StreamClientInner>
  );
};

export default StreamClientProvider;
