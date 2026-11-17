"use client";

import { useEffect, useState } from "react";

export const DateTimeComponent = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      setDate(
        now.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        }),
      );

      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }),
      );
    };

    updateDateTime();

    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl  font-extrabold lg:text-7xl">{time}</h1>
      <p className="text-lg font-medium lg:text-2xl text-sidebar-primary">
        {date}
      </p>
    </div>
  );
};
