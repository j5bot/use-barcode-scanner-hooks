import { useEffect, useState } from 'react';
import { getUserMedia, removeStreamTracks } from './stream';

export const useHasCameraPermission = () => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    useEffect(() => {
        let active = true;

        resolveCameraPermission().then((permission) => {
            if (!active) {
                return;
            }
            setHasPermission(permission);
        });

        return () => { active = false; };
    }, [setHasPermission]);

    return { hasPermission };
};

export const canGetUserMedia = (): Promise<boolean> => {
    return getUserMedia({
            video: true,
            audio: false,
        }, 'canGetUserMedia')
        .then((stream: MediaStream) => {
            removeStreamTracks(stream);
            return true;
        })
        .catch(() => false);
};

const getHasDeviceLabels = (): Promise<boolean> => {
    return navigator.mediaDevices.enumerateDevices()
        .then((mediaDeviceInfos: MediaDeviceInfo[]) => {
            return mediaDeviceInfos.find((mediaDeviceInfo: MediaDeviceInfo) => {
                return mediaDeviceInfo.deviceId?.length > 0;
            }) !== undefined;
        });
};

const resolveCameraPermission = (): Promise<boolean> => {
    return getHasDeviceLabels().then((hasDeviceLabels: boolean) => {
        return hasDeviceLabels ? Promise.resolve(true) : canGetUserMedia();
    });
}
