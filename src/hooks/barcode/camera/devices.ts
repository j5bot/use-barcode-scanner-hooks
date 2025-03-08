import { useEffect, useState } from 'react';

export const useGetDeviceList = (hasPermission: boolean, onDevices?: (deviceList: MediaDeviceInfo[]) => void): { deviceList: MediaDeviceInfo[] } => {
    const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);

    useEffect(() => {
        let active = true;

        if (hasPermission) {
            listDevices().then((deviceList: MediaDeviceInfo[]) => {
                if (!active) {
                    return;
                }
                setDeviceList(deviceList);
                onDevices?.(deviceList);
            });
        }

        return () => { active = false; };
    }, [hasPermission, onDevices]);

    return { deviceList };
};

const listDevices = async (): Promise<MediaDeviceInfo[]> => {
    let devices = await navigator.mediaDevices?.enumerateDevices?.();
    return devices?.filter((device) => device.kind === 'videoinput') ?? [];
};
