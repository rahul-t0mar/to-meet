import { DateTimeComponent } from "@/components/common/DateAndTime";
import MeetingTypeList from "@/components/common/MeetingTypeList";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-foreground">
      <div className="relative h-[250px] w-full overflow-hidden rounded-[20px]">
        <Image
          src="/images/hero-background.png"
          alt="Banner background"
          fill
          priority
          className="object-cover"
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-8">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM
          </h2>
          <DateTimeComponent />
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
