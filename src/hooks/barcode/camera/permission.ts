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

export const canGetUserMedia = async (): Promise<boolean> => {
    try {
        let stream = await getUserMedia({
            video: true,
            audio: false,
        }, 'canGetUserMedia');
        removeStreamTracks(stream);
        return true;
    } catch (e) {
        return false;
    }
};

const getHasDeviceLabels = async (): Promise<boolean> => {
    const mediaDeviceInfos = await navigator.mediaDevices?.enumerateDevices?.();
    return !!mediaDeviceInfos?.find((mediaDeviceInfo: MediaDeviceInfo) => {
        return mediaDeviceInfo.deviceId?.length > 0;
    });
};

const resolveCameraPermission = async (): Promise<boolean> => {
    let hasDeviceLabels = await getHasDeviceLabels();
    return hasDeviceLabels ? Promise.resolve(true) : canGetUserMedia();
}
