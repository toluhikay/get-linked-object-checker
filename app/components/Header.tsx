"use client";
import React from "react";
import { LogoSvg, TimerSvg } from "../assets/svgs/GeneralSvgs";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="w-full sticky top-0 left-0 flex items-center justify-center bg-white px-[1.5rem]">
      <div className="w-full max-w-screen-xl flex items-center justify-between py-3">
        <div
          className="flex items-center gap-x-[1rem] cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <LogoSvg />
          <p className="flex flex-col md:text-[1.25rem] text-[1rem] font-medium leading-none">
            <span>Frontend developer</span>
            <span className="md:text-sm text-xs text-[#8C8CA1]">Skill assessment test</span>
          </p>
        </div>
        <div className="flex items-center text-[#755AE2] md:gap-x-[1rem] gap-x-[.25rem]">
          <div className="bg-[#ECE8FF] rounded-lg md:px-[2rem] px-[.5rem] flex items-center md:gap-x-[1rem] gap-x-[.5rem]  text-[#755AE2] font-bold md:text-[1.125rem] text-sm md:py-[1rem] py-[.5rem]">
            <TimerSvg />{" "}
            <p className="space-x-[.25rem]">
              <span>29:10</span>
              <span className="md:text-sm text-xs font-medium">time left</span>
            </p>
          </div>
          <div className="bg-[#ECE8FF] w-[1.875rem] h-[1.875rem] cursor-pointer rounded-full flex flex-col justify-center items-center text-lg">
            <RiEyeLine className="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
