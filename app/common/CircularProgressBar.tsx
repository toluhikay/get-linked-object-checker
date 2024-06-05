import React from "react";

const CircularProgressBar = ({ progress, children }: { progress?: number; children: React.ReactNode }) => {
  const strokeDasharray = `${progress}, 100`;

  return (
    <div className="relative flex items-center justify-center">
      <div className="w-[2.125rem] h-[2.125rem]">
        <svg className="transform -rotate-40" viewBox="0 0 36 36">
          <path
            className="text-gray-300"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="1"
          />
          <path
            className={progress && progress > 50 && progress < 70 ? "text-weak-500" : progress && progress >= 70 ? "text-green-500" : "text-warning-500"}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="1"
            strokeDasharray={strokeDasharray}
          />
        </svg>
      </div>
      <div className={`absolute flex items-center justify-center text-sm inset-0 ${progress && progress > 50 && progress < 70 ? "text-weak-500" : progress && progress >= 70 ? "text-green-500" : "text-warning-500"}`}>{children}</div>
    </div>
  );
};

export default CircularProgressBar;
