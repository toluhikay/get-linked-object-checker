"use client";
import React, { useEffect, useState } from "react";
import { LogoSvg, LogoSvgSmall, TimerSvg } from "../assets/svgs/GeneralSvgs";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const Header = () => {
  const initialTime = 1800;
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(true);

  useEffect(() => {
    startTimer();
    let timer: any;
    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, time]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(initialTime);
  };

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  const router = useRouter();
  return (
    <header className="w-full sticky top-0 left-0 flex z-[999] items-center justify-center bg-white px-[1.5rem]">
      <div className="w-full max-w-screen-xl flex items-center justify-between py-3">
        <div
          className="flex items-center gap-x-[1rem] cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <div className="hidden md:flex">
            <LogoSvg />
          </div>
          <div className="md:hidden">
            <LogoSvgSmall />
          </div>
          <p className="flex flex-col md:text-[1.25rem] sm:text-[1rem] text-[.8rem] font-medium leading-none">
            <span>Frontend developer</span>
            <span className="md:text-sm text-xs text-[#8C8CA1]">Skill assessment test</span>
          </p>
        </div>
        <div className="flex items-center text-[#755AE2] md:gap-x-[1rem] gap-x-[.25rem]">
          <div className="bg-[#ECE8FF] rounded-lg md:px-[2rem] px-[.5rem] flex items-center md:gap-x-[1rem] gap-x-[.5rem]  text-[#755AE2] font-bold md:text-[1.125rem] sm:text-sm text-xs md:py-[1rem] py-[.5rem]">
            {isActive2 ? (
              <>
                <TimerSvg />{" "}
                <p className="space-x-[.25rem]">
                  <span>{formatTime(time)}</span>
                  <span className="md:text-sm sm:text-xs text-[.5rem] font-medium">time left</span>
                </p>
              </>
            ) : (
              <p>Show Timer</p>
            )}
          </div>
          <div
            className="bg-[#ECE8FF] sm:w-[1.875rem] sm:h-[1.875rem] cursor-pointer rounded-full flex flex-col justify-center items-center text-lg"
            onClick={() => {
              setIsActive2(!isActive2);
            }}
          >
            {isActive2 ? <RiEyeLine className="" /> : <RiEyeOffLine />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
