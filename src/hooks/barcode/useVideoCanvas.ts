import { MutableRefObject, useCallback, useEffect, useMemo, useState } from 'react';

type DrawImageBounds = [number, number, number, number, number, number, number, number];

export type UseVideoCanvasOptions = {
    onDraw?: () => void;
    onPlay?: () => void;
    webcamVideoRef: MutableRefObject<HTMLVideoElement | null>;
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
    hasPermission?: boolean;
    shouldPlay?: boolean;
    timeoutDelay?: number;
    zoom?: number;
}

const playWithRetry = (videoElement: HTMLVideoElement): Promise<any> => {
    return videoElement.play().catch((error) => {
        console.log(error);
        return new Promise((resolve) => {
            setTimeout(() => resolve(playWithRetry(videoElement)), 100);
        });
    });
};

export const useVideoCanvas = (options: UseVideoCanvasOptions) => {
    const {
        onDraw,
        onPlay,
        webcamVideoRef,
        canvasRef,
        hasPermission = true,
        shouldPlay,
        timeoutDelay = 17,
        zoom = 1,
    } = options;

    const [context, setContext] = useState<CanvasRenderingContext2D | null>();
    const [hasListener, setHasListener] = useState<boolean>(false);

    const bounds: DrawImageBounds = useMemo(() => {
        const video = webcamVideoRef.current;
        const canvas = canvasRef.current;

        if (!(video && canvas)) {
            return [0, 0, 0, 0, 0, 0, 0, 0];
        }

        return [
            // gets center of the video image
            (video.width - canvas.width) / 2,
            (video.height - canvas.height) / 2,
            // zooms center of video image
            canvas.width / zoom,
            canvas.height / zoom,
            0,
            0,
            canvas.width,
            canvas.height,
        ];

    }, [canvasRef.current, webcamVideoRef.current, zoom]);

    const streamToCanvas = useMemo(() => () => {
        const videoElement = webcamVideoRef.current;

        if (!(context && videoElement)) {
            setTimeout(streamToCanvas, 100);
            return;
        }

        context.drawImage(videoElement, ...bounds);
        onDraw?.();

        window.setTimeout(streamToCanvas, timeoutDelay);

    }, [context]);

    useEffect(() => {

        if (!context && canvasRef.current) {
            setContext(canvasRef.current?.getContext('2d'));
        }

        if (hasPermission && context && webcamVideoRef.current) {
            if (!hasListener) {
                webcamVideoRef.current.addEventListener('play', (event) => {
                    streamToCanvas();
                });
                if (shouldPlay) {
                    playWithRetry(webcamVideoRef.current).then(onPlay);
                }
                setHasListener(true);
            }
        }
    }, [webcamVideoRef.current, hasPermission, context]);
};
