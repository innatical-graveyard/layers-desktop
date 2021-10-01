import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { FC, forwardRef } from "react";

export const IconButton: FC<{
  href?: string;
  icon: IconDefinition;
  className?: string;
  color:
    | "bg-chat-input-elements-dark"
    | "bg-inndigo"
    | "bg-transparent"
    | "bg-danger"
    | "bg-secondary"
    | "bg-yellow-500"
    | "bg-red-500";
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  enforceAspectRatio?: boolean;
}> = ({
  href,
  icon,
  className,
  color,
  disabled,
  onClick,
  enforceAspectRatio,
}) => {
  let classes = `${
    className || ""
  } p-3 ${color} rounded-xl flex justify-center items-center ${
    className?.includes("h-") ? "" : "h-full"
  } w-9 h-9 sm:w-12 sm:h-12`;

  if (typeof enforceAspectRatio === "undefined" || enforceAspectRatio) {
    classes += " ratio-1-1";
  }

  if (href) {
    return (
      <Link href={href}>
        <button className={classes} disabled={disabled} onClick={onClick}>
          <FontAwesomeIcon icon={icon} fixedWidth />
        </button>
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick}>
      <FontAwesomeIcon icon={icon} fixedWidth />
    </button>
  );
};
