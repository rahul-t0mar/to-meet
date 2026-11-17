import { Suspense } from "react";


type Props = {
  params: Promise<{ id: string }>;
};

const MeetingContent = async ({ params }: Props) => {
  const { id } = await params;

  return <div>Meeting Room: #{id}</div>;
};

const Meeting = ({ params }: Props) => {
  return (
    <div>
      <h1>Welcome to Meeting</h1>

      <Suspense fallback={<p>Loading meeting...</p>}>
        <MeetingContent params={params} />
      </Suspense>
    </div>
  );
};

export default Meeting;