import CallList from "@/components/common/CallList";
import React from "react";

const Upcoming = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-foreground">
      <h1 className="text-3xl font-bold">Upcoming Meeting List</h1>
      <CallList type="upcoming" />
    </section>
  );
};

export default Upcoming;
