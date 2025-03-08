import React from "react";
import { ComponentStory } from "@storybook/react";
import { useRef } from "react";
import { useVideoCanvas, useWebcam } from "../../../hooks";

const VideoCanvasStories = () => {
  const { webcamVideoRef, hasPermission } = useWebcam();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useVideoCanvas({
    webcamVideoRef,
    canvasRef,
    hasPermission,
    shouldPlay: true,
  });

  return (
    <div>
      {hasPermission ? (
        <div className={"video-canvas-container"}>
          <div className={"video-canvas-video"}>
            <video ref={webcamVideoRef} width={640} height={480} />
          </div>
          <div className={"video-canvas"}>
            <canvas ref={canvasRef} width={320} height={240} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default {
  component: VideoCanvasStories,
  title: "Video/Video Canvas",
};

const Template: ComponentStory<typeof VideoCanvasStories> = (args: any) => (
  <VideoCanvasStories {...args} />
);

export const VideoCanvas = Template.bind({});
VideoCanvas.args = {};
