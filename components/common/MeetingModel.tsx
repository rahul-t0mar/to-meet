import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "cn";
import { Button } from "../ui/button";

interface MeetingModelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className: string;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
  children?: ReactNode;
}

const MeetingModel = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonIcon,
}: MeetingModelProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]" />
      <DialogContent className="!max-w-[450px] w-full flex flex-col gap-6 border-none  px-6 py-9 text-foreground">
        <div className="flex flex-col gap-6 ">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {children}
          <Button
            className="bg-primary focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image src={buttonIcon} alt="Icons" width={13} height={13} />
            )}{" "}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModel;
