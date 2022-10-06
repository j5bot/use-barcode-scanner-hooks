import { useEffect, useMemo, useState } from 'react';

export type DeviceChoiceOptions = {
    matcher?: RegExp;
    deviceId?: string;
    facingMode?: 'user' | 'environment';
};

export const useDeviceStream = (deviceList: MediaDeviceInfo[], deviceChoiceOptions: DeviceChoiceOptions) => {
    const [stream, setStream] = useState<MediaStream>();

    const constraints = useMemo(() => getMediaConstraintsForDeviceChoiceOptions(deviceList, deviceChoiceOptions), [deviceList, deviceChoiceOptions]);

    useEffect(() => {
        let active = true;

        getDeviceStream(constraints).then((stream: MediaStream) => {
            if (!active) {
                return;
            }
            setStream(stream);
        });

        return () => { active = false };
    }, [constraints]);

    return { stream };
};

const getDeviceStream = (constraints: MediaStreamConstraints): Promise<MediaStream> => {
    return navigator.mediaDevices.getUserMedia(constraints);
};

const getMediaConstraintsForDeviceChoiceOptions = (deviceList: MediaDeviceInfo[], deviceChoiceOptions: DeviceChoiceOptions) => {
    const constraints: MediaStreamConstraints = { audio: false, video: true };

    if (deviceList.length <= 1) {
        return constraints;
    }

    let advancedConstraints: MediaTrackConstraintSet[] = [];
    let { deviceId } = deviceChoiceOptions;
    const { matcher, facingMode } = deviceChoiceOptions;

    if (deviceId) {
        advancedConstraints.push({ deviceId });
    }
    if (!deviceId && matcher) {
        const matched = deviceList.filter((deviceInfo) => {
            return matcher.test(deviceInfo.label);
        });
        if (matched.length === 1) {
            advancedConstraints.push({ deviceId: matched[0].deviceId });
        }
        if (matched.length > 1 && facingMode) {
            advancedConstraints = advancedConstraints.concat(
                matched.map((matchingDevice) => {
                    return { deviceId: matchingDevice.deviceId, facingMode };
                })
            )
        }
    }
    if (!(deviceId || matcher) && facingMode) {
        advancedConstraints.push({ facingMode });
    }

    if (advancedConstraints.length > 0) {
        constraints.video = { advanced: advancedConstraints };
    }

    return constraints;
};

export const removeStreamTracks = (stream: MediaStream): void => {
    stream.getTracks().forEach((track) => {
        track.enabled = false;
        track.stop();
        stream.removeTrack(track);
    });
};
