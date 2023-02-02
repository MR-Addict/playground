"use client";

import style from "./Tooltip.module.css";

export default function Tooltip({
  title,
  children,
  position = "top",
}: {
  title: string;
  position?: string;
  children: React.ReactNode;
}) {
  if (position === "top")
    return (
      <div className={[style.tip, style.top].join(" ")} tip-data={title}>
        {children}
      </div>
    );
  else if (position === "bottom")
    return (
      <div className={[style.tip, style.bottom].join(" ")} tip-data={title}>
        {children}
      </div>
    );
  else if (position === "right")
    return (
      <div className={[style.tip, style.right].join(" ")} tip-data={title}>
        {children}
      </div>
    );
  return (
    <div className={[style.tip, style.left].join(" ")} tip-data={title}>
      {children}
    </div>
  );
}
