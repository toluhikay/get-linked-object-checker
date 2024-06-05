interface Detection {
  bbox: [number, number, number, number];
  class: string;
}

export const handleStartWebcam = ({ setOffVideo }: { setOffVideo: React.Dispatch<React.SetStateAction<boolean>> }) => {
  setOffVideo(true);
};

export const handleStopWebcam = ({ setOffVideo, webcamRef }: { setOffVideo: React.Dispatch<React.SetStateAction<boolean>>; webcamRef: any }) => {
  setOffVideo(false);
  const video = webcamRef.current.video;
  if (video) {
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track: any) => {
      track.stop();
    });

    video.srcObject = null;
  }
};

// toggle mic on and off

export const startMic = async ({ audioContextRef, mediaStreamRef, setIsRecording }: { audioContextRef: any; mediaStreamRef: any; setIsRecording: React.Dispatch<React.SetStateAction<boolean>> }) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContextRef.current = new (window.AudioContext || window.AudioContext)();
    mediaStreamRef.current = stream;

    const source = audioContextRef.current.createMediaStreamSource(stream);
    source.connect(audioContextRef.current.destination);

    setIsRecording(true);
  } catch (error) {
    console.error("Error accessing microphone:", error);
  }
};

export const stopMic = ({ audioContextRef, mediaStreamRef, setIsRecording }: { audioContextRef: any; mediaStreamRef: any; setIsRecording: React.Dispatch<React.SetStateAction<boolean>> }) => {
  if (mediaStreamRef.current) {
    mediaStreamRef.current.getTracks().forEach((track: any) => track.stop());
    audioContextRef.current.close();
  }
  setIsRecording(false);
};
