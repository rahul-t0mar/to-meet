import React, { ReactNode } from "react";

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
  return <div>MeetingModel</div>;
};

export default MeetingModel;
