"use client";
import { useRouter } from "next/navigation";
import React from "react";

const StartAssessmentModal = ({ setOpenModal }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const router = useRouter();
  return (
    <main className="fixed top-0 left-0 w-screen z-[99999] flex flex-col items-center justify-center h-screen bg-black/30">
      <div className="w-[29.5rem] h-automax-w-[95%]  bg-[#F5F3FF] rounded-2xl overflow-hidden">
        <div className="w-full p-[1.5rem] bg-primary flex justify-between items-center">
          <p className="font-medium text-white">Start assessment</p>
          <button
            className="bg-purple-400 px-[1rem] py-[.45rem] rounded-[.625rem] text-white text-xs "
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Close
          </button>
        </div>
        <div className="w-full flex flex-col items-center justify-center text-center py-[2rem]">
          <div className="w-[70%] space-y-[.5rem]">
            <p className="text-primary font-medium text-xl">Proceed to start assessment</p>
            <p className="text-sm text-[675E8B]">Kindly keep to the rules of the assessment and sit up, stay in front of your camera/webcam and start your assessment.</p>
          </div>
        </div>
        <div className="w-full bg-white rounded-t rounded-2xl px-[2rem] py-[1rem] flex justify-end items-end">
          <button
            className="w-fit text-sm font-medium bg-primary text-white rounded-[.45rem] p-[.5rem] px-[2rem]"
            onClick={() => {
              setOpenModal(false);
              router.push("/thank-you");
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </main>
  );
};

export default StartAssessmentModal;
