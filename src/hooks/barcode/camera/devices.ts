import { useEffect, useState } from 'react';

export const useGetDeviceList = (hasPermission: boolean): { deviceList: MediaDeviceInfo[] } => {
    const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);

    useEffect(() => {
        let active = true;

        if (hasPermission) {
            listDevices().then((deviceList: MediaDeviceInfo[]) => {
                if (!active) {
                    return;
                }
                setDeviceList(deviceList);
            });
        }

        return () => { active = false; };
    }, [hasPermission]);

    return { deviceList };
};

const listDevices = (): Promise<MediaDeviceInfo[]> => {
    return navigator.mediaDevices.enumerateDevices().then((devices: MediaDeviceInfo[]) =>
        devices.filter((device) => device.kind === 'videoinput')
    );
};
