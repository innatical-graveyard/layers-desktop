import { FC } from "react";

export const Button: FC<{
  className?: string;
  color:
    | "bg-chat-input-elements-dark"
    | "bg-inndigo"
    | "bg-transparent"
    | "bg-danger"
    | "bg-secondary"
    | "bg-yellow-500"
    | "bg-red-500";
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  height?: "tall";
}> = ({ children, className, color, onClick, disabled, type, height }) => {
  const classes = `${className || ""} px-3 ${
    height === "tall" ? "py-3" : "py-2"
  } font-bold ${
    className?.includes("rounded-") ? "" : "rounded-xl"
  } text-offwhite self-right ${color}`;

  return (
    <button
      disabled={disabled}
      className={classes}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
