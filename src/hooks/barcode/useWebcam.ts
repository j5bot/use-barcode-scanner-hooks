import { useEffect, useRef, useState } from 'react';
import { useGetDeviceList } from './camera/devices';
import { useHasCameraPermission } from './camera/permission';
import { DeviceChoiceOptions, useDeviceStream } from './camera/stream';

const defaultDeviceChoiceOptions: DeviceChoiceOptions = {
    matcher: /back/i,
    facingMode: 'environment',
};

export const useWebcam = (
    deviceChoiceOptions?: DeviceChoiceOptions,
    onDevices?: (deviceList: MediaDeviceInfo[]) => void
) => {
    const webcamVideoRef = useRef<HTMLVideoElement | null>(null);
    const { hasPermission } = useHasCameraPermission();
    const { deviceList } = useGetDeviceList(hasPermission);
    onDevices?.(deviceList);

    const { stream } = useDeviceStream(deviceList, deviceChoiceOptions ?? defaultDeviceChoiceOptions);
    const { isStreaming } = useStreamToVideoElement(webcamVideoRef.current, stream);

    return {
        webcamVideoRef,
        deviceList,
        hasPermission,
        stream,
        isStreaming,
    };
};

const useStreamToVideoElement = (videoElement: HTMLVideoElement | null, stream: MediaStream | undefined) => {
    const [isStreaming, setIsStreaming] = useState<boolean>(false);

    useEffect(() => {
        let active = true;

        if (!isStreaming && videoElement && stream) {
            videoElement.srcObject = stream;
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

        return () => { active = false; };
    }, [stream, videoElement, isStreaming]);

    return { isStreaming };
};
