"use client";
import React from "react";
import Image from "next/image";

interface CardProps {
  bgColor: string;
  iconUrl: string;
  handleClick: () => void;
  text: string;
  description: string;
};

const HomeCard = ({ bgColor, iconUrl, handleClick, text, description }: CardProps) => {
  return (
    <div
     style={{ backgroundColor: bgColor }}
      className="px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer hover:scale-101"
      onClick={handleClick}
    >
      <div className="flex justify-center items-center glassmorphism size-12 rounded-[10px]">
        <Image src={iconUrl} alt="Add meeting" width={32} height={32} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{text}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
