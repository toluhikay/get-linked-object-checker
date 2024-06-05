import ObjectChecker from "./components/ObjectChecker";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="w-full max-w-screen-xl py-[2rem] flex flex-col items-center px-[1.5rem]">
        <div className="xl:w-[60.5%] w-full bg-white rounded-[1.125rem] space-y-[2rem] p-[3rem]">
          <div className=" leading-[2rem]">
            <p className="font-medium text-[1.25rem]">System check</p>
            <p className="leading-relaxed text-[#4A4A68]">
              We utilize your camera image to ensure fairness for all participants, and we also employ both your camera and microphone for a video questions where you will be prompted to record a response using your camera or webcam, so it's essential to verify that your camera and microphone are functioning correctly and that you have a stable internet connection. To do this, please position
              yourself in front of your camera, ensuring that your entire face is clearly visible on the screen. This includes your forehead, eyes, ears, nose, and lips. You can initiate a 5-second recording of yourself by clicking the button below.
            </p>
          </div>
          <ObjectChecker />
        </div>
      </div>
    </main>
  );
}
