import React, { ReactNode } from "react";

const MeetingLayout = ({ children }: { children: ReactNode }) => {
  return <div className="w-full h-screen">{children}</div>;
};

export default MeetingLayout;
