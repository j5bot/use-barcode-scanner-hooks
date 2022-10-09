import { useEffect, useMemo, useState } from 'react';

export type DeviceChoiceOptions = {
    matcher?: RegExp;
    deviceId?: string;
    facingMode?: 'user' | 'environment';
};

export const useDeviceStream = (hasPermission: boolean, deviceList: MediaDeviceInfo[], deviceChoiceOptions: DeviceChoiceOptions) => {
    const [stream, setStream] = useState<MediaStream>();

    const constraints = useMemo(
        () => getMediaConstraintsForDeviceChoiceOptions(deviceList, deviceChoiceOptions),
        [deviceList, deviceChoiceOptions]
    );

    useEffect(() => {
        let active = true;

        if (hasPermission && constraints) {
            getUserMedia(constraints, 'useDeviceStream #1').then((stream: MediaStream) => {
                if (!active) {
                    removeStreamTracks(stream);
                    return;
                }
                setStream(stream);
            }).catch((error) => {
                console.log(`requested device not available`, error);
                return getUserMedia({ video: { advanced: [{ facingMode: 'environment' }] } }, 'useDeviceStream #2').then(setStream)
                    .catch((error) => {
                        console.log('no environment-facing camera available', error);
                        return getUserMedia({ video: true }, 'useDeviceStream #3').then(setStream);
                    });
            });
        }

        return () => { active = false };
    }, [hasPermission, constraints]);

    return { stream };
};

const getMediaConstraintsForDeviceChoiceOptions = (deviceList: MediaDeviceInfo[], deviceChoiceOptions: DeviceChoiceOptions) => {
    const constraints: MediaStreamConstraints = { audio: false, video: true };

    if (deviceList.length === 0) {
        return undefined;
    }

    if (deviceList.length === 1) {
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

/* uncomment all the things here if you're having trouble getting media */
// let useMediaAttempts = 0;
// let useMediaSuccesses = 0;

export const getUserMedia = (constraints: MediaStreamConstraints, context: string = '') => {
    // const attempts = ++useMediaAttempts;
    // console.log(`use media attempts: ${attempts} (${context})`, constraints);
    // const successes = useMediaSuccesses;
    return navigator.mediaDevices.getUserMedia(constraints)
        .then((stream: MediaStream) => {
            // console.log(`use media success: ${successes + 1}/${attempts} (${context})`, constraints);
            // useMediaSuccesses++;
            return stream;
        });
};

export const removeStreamTracks = (stream: MediaStream): void => {
    stream.getTracks().forEach((track) => {
        track.enabled = false;
        track.stop();
        stream.removeTrack(track);
    });
};
