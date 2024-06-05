"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import ObjectCheckerWrapper from "../common/ObjectCheckerWrapper";
import { GadgetMicSvg, GadgetMicSvgSmall, LighteningSvg, LighteningSvgSmall, WarningSvg, WebCamSvg, WebCamSvgSmall, WifiSvg, WifiSvgSmall } from "../assets/svgs/GeneralSvgs";
import * as tf from "@tensorflow/tfjs";
import * as cocoSSD from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import Webcam from "react-webcam";
import { handleStartWebcam, handleStopWebcam, startMic, stopMic } from "../utils/utils";
import axios from "axios";
import speedChecker from "internet-speed-checker";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

const StartAssessmentModal = dynamic(
  () => {
    return import("@/app/modals/StartAssessmentModal");
  },
  {
    ssr: false,
  }
);

const ObjectChecker = () => {
  // modal
  const [openModal, setOpenModal] = useState(false);

  const [imageUrls, setImageUrl] = useState("");

  // internetspeed
  const [internetSpeed, setInternetSpeed] = useState(0);

  useEffect(() => {
    const download = setInterval(() => {
      const formattedDownloadSpeedString = speedChecker.getFormattedDownloadSpeed();
      // console.log(formattedDownloadSpeedString.split(" ")[1]);
      // calc speed based on 1024mbs
      if (formattedDownloadSpeedString.split(" ")[1] === "Kbps") {
        // const divider = 100
        setInternetSpeed(Number(formattedDownloadSpeedString.split(" ")[0]));
      }
      if (formattedDownloadSpeedString.split(" ")[1] === "bps") {
        // const divider = 100
        setInternetSpeed(Number(formattedDownloadSpeedString.split(" ")[0]));
      }
      if (formattedDownloadSpeedString.split(" ")[1] === "Mbps") {
        // const divider = 100
        setInternetSpeed(Number(formattedDownloadSpeedString.split(" ")[0]));
      }
    }, 10000);

    // Cleanup the interval when the component is unmounted
    return () => {
      clearInterval(download);
    };
  }, []);
  // screenbrightness
  const [screenbrightness, setScreenBrightness] = useState(0);

  // mic state
  const [isRecording, setIsRecording] = useState(false);
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/brightness", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setScreenBrightness(parseFloat(response?.data?.messsage) * 100);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    // Fetch current brightness from the server
  }, []);

  const webcamRef = useRef<any | null>(null);

  const [offVideo, setOffVideo] = useState(false);

  const runCoco = async (): Promise<void> => {
    const net = await cocoSSD.load();
    setInterval(() => {
      detect(net);
    }, 1000);
  };

  const [object, setObject] = useState<any>([]);

  const detect = async (net: any) => {
    // Check data is available
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      // Get Video Properties
      const video = webcamRef.current.video;

      // Make Detections
      const obj = await net.detect(video);
      // console.log(obj);

      setObject(obj);
    }
  };

  const capture = () => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageUrl(imageSrc);
      setObject([]);
      setOffVideo(false);
      setOpenModal(true);
      return;
    }
    alert("Turn on Your Video To Take Camera");
  };

  useEffect(() => {
    runCoco();
    // navigator.mediaDevices.getUserMedia({ audio: false });
  }, [offVideo, isRecording, object]);

  return (
    <section className="w-full py-2 flex flex-col items-start gap-[2rem] ">
      <div className="flex flex-wrap items-start gap-[2rem]">
        <div className="md:w-fit w-full space-y-[1rem]">
          <div className={`md:w-[17.25rem] w-full h-[20rem] max-w-full relative rounded-[.625rem] bg-black/80 md:h-[10.5rem] ${object.length > 0 ? "border-[3px] border-[#FF0000]" : "border border-[#755AE2]"} `}>
            {imageUrls !== "" && !offVideo ? (
              <img className="w-full h-full" src={imageUrls} alt="" />
            ) : (
              offVideo && (
                <Fragment>
                  <Webcam
                    ref={webcamRef}
                    muted={true}
                    style={{
                      left: 0,
                      right: 0,
                      textAlign: "center",
                      zIndex: 9,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  {object.length > 0 && (
                    <div className={`absolute top-[2%] bg-[#FF0000]/70 text-white  font-medium rounded px-[.5rem] py-[.5rem] w-fit z-[999] left-[2%]`}>
                      {" "}
                      <span className="capitalize">{object[0]?.class.concat(" detected")} </span>
                    </div>
                  )}
                </Fragment>
              )
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-[1rem] md:w-[40%] w-full justify-center items-center">
          <ObjectCheckerWrapper
            onClick={() => {
              if (!offVideo) {
                handleStartWebcam({ setOffVideo });
              } else if (offVideo) {
                handleStopWebcam({ setOffVideo, webcamRef });
                setObject([]);
              }
            }}
            icon={<WebCamSvg />}
            objectChecked={offVideo}
            iconSmall={<WebCamSvgSmall />}
            warningDiv={false}
            deviceName="Webcam"
          />
          <ObjectCheckerWrapper onClick={() => {}} icon={<WifiSvg />} objectChecked={true} progress={internetSpeed} iconWarning={<WarningSvg />} iconSmall={<WifiSvgSmall />} warningDiv={true} deviceName="Internet Speed" />

          <ObjectCheckerWrapper
            onClick={() => {
              if (!isRecording) {
                startMic({ audioContextRef, mediaStreamRef, setIsRecording });
              }
              if (isRecording) {
                stopMic({ audioContextRef, mediaStreamRef, setIsRecording });
              }
            }}
            icon={<GadgetMicSvg />}
            objectChecked={isRecording}
            iconSmall={<GadgetMicSvgSmall />}
            warningDiv={false}
            deviceName="Gadget Mic"
          />

          <ObjectCheckerWrapper icon={<LighteningSvg />} objectChecked={true} progress={screenbrightness} iconSmall={<LighteningSvgSmall />} warningDiv={false} deviceName="Lighetning" />
        </div>
      </div>
      <div className="w-full flex md:items-start items-center md:justify-start justify-center">
        {typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4 && (
          <button onClick={capture} className="w-fit text-sm font-medium bg-primary text-white rounded-[.45rem] p-[1rem] px-[1.5rem]">
            Take picture and continue
          </button>
        )}
      </div>
      {openModal && createPortal(<StartAssessmentModal setOpenModal={setOpenModal} />, document.getElementById("portals") as HTMLElement)}
    </section>
  );
};

export default ObjectChecker;
