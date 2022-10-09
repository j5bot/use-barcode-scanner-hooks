import { useEffect, useRef, useState } from 'react';
import { useGetDeviceList } from './camera/devices';
import { useHasCameraPermission } from './camera/permission';
import { DeviceChoiceOptions, useDeviceStream } from './camera/stream';

const defaultDeviceChoiceOptions: DeviceChoiceOptions = {
    matcher: /back/i,
    facingMode: 'environment',
};

export type UseWebcamOptions = {
    deviceChoiceOptions?: DeviceChoiceOptions;
    onDevices?: (deviceList: MediaDeviceInfo[]) => void
    shouldPlay?: boolean;
}

export const useWebcam = (options: UseWebcamOptions = {}) => {
    const { deviceChoiceOptions, onDevices, shouldPlay } = options;

    const webcamVideoRef = useRef<HTMLVideoElement | null>(null);
    const { hasPermission } = useHasCameraPermission();
    const { deviceList } = useGetDeviceList(hasPermission, onDevices);

    const { stream } = useDeviceStream(hasPermission, deviceList, deviceChoiceOptions ?? defaultDeviceChoiceOptions);
    const { isStreaming } = useStreamToVideoElement(webcamVideoRef.current, stream, shouldPlay);

    return {
        webcamVideoRef,
        deviceList,
        hasPermission,
        stream,
        isStreaming,
    };
};

const useStreamToVideoElement = (
    videoElement: HTMLVideoElement | null,
    stream: MediaStream | undefined,
    shouldPlay?: boolean,
) => {
    const [isStreaming, setIsStreaming] = useState<boolean>(false);

    useEffect(() => {
        let active = true;

        if (!isStreaming && videoElement && stream) {
            videoElement.srcObject = stream;
            if (shouldPlay) {
                videoElement.play()
                    .then(() => {
                        if (!active) {
                            return;
                        }
                        setIsStreaming(true);
                    })
                    .catch(() => {
                        if (!active) {
                            return;
                        }
                        setIsStreaming(false);
                    });
            }
        }

        return () => { active = false; };
    }, [stream, videoElement, isStreaming]);

    return { isStreaming };
};
