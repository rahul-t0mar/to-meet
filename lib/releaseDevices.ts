
import { Call } from "@stream-io/video-react-sdk";

export const releaseDevices = async (call?: Call) => {
  if (!call) return;
  await call.camera.disable(true).catch(() => {});
  await call.microphone.disable(true).catch(() => {});

  [call.camera.state.mediaStream, call.microphone.state.mediaStream].forEach(
    (stream) => stream?.getTracks().forEach((track) => track.stop())
  );
};