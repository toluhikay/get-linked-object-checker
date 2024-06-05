import React from "react";
import { CheckedSvg, ThickDotSvg } from "../assets/svgs/GeneralSvgs";
import CircularProgressBar from "./CircularProgressBar";
import CircularProgressBarMain from "./CircularProgressBarMain";

interface ObjectCheckerProps {
  objectChecked?: any;
  icon: React.ReactNode;
  iconWarning?: React.ReactNode;
  iconSmall: React.ReactNode;
  deviceName: string;
  warningDiv: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  progress?: number;
}

const ObjectCheckerWrapper = (props: ObjectCheckerProps) => {
  const { objectChecked, icon, iconSmall, deviceName, warningDiv, onClick, iconWarning, progress } = props;
  return (
    <div onClick={onClick} className={`w-[6rem]  h-[4.5rem] bg-[#F5F3FF] cursor-pointer overflow-hidden text-wrap rounded-[.625rem] relative border-[#E6E0FF] border flex flex-col items-center justify-center gap-[.5rem]`}>
      <div className={` w`}>
        {!objectChecked ? (
          <div className="bg-[#E6E0FF] w-[2.125rem] h-[2.125rem] flex flex-col justify-center items-center rounded-full">{icon}</div>
        ) : objectChecked && warningDiv && progress ? (
          <CircularProgressBar progress={progress && progress} children={iconWarning} />
        ) : objectChecked && progress ? (
          <CircularProgressBarMain progress={progress && progress} children={icon} />
        ) : (
          objectChecked &&
          !progress && (
            <div>
              <CheckedSvg />
            </div>
          )
        )}
      </div>
      <p className="text-[.625rem] text-[F5F3FF]">{deviceName}</p>
      <div className={`absolute right-[2%] top-[2%]`}>{!objectChecked ? <ThickDotSvg /> : <div className={`w-[1rem] z-[99] ${objectChecked && warningDiv ? `${progress && progress > 50 && progress < 70 ? "bg-[greenyellow]" : progress && progress >= 70 ? "bg-green-500" : "bg-[#ff3c00]"}` : "bg-primary"} h-[1rem] rounded-full flex flex-col items-center justify-center`}>{iconSmall}</div>}</div>
    </div>
  );
};

export default ObjectCheckerWrapper;
