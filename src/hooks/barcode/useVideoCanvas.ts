import { MutableRefObject, useCallback, useEffect, useMemo, useState } from 'react';

type DrawImageBounds = [number, number, number, number, number, number, number, number];

export type UseVideoCanvasOptions = {
    onDraw?: () => void;
    webcamVideoRef: MutableRefObject<HTMLVideoElement | null>;
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
    hasPermission?: boolean;
    context: CanvasRenderingContext2D | null | undefined;
    zoom?: number;
}

export const useVideoCanvas = (options: UseVideoCanvasOptions) => {
    const {
        onDraw,
        webcamVideoRef,
        canvasRef,
        context,
        hasPermission = true,
        zoom = 1,
    } = options;

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

    }, [canvasRef, webcamVideoRef, zoom]);

    const streamToCanvas = useCallback(() => {
        const videoElement = webcamVideoRef.current;

        if (!(context && videoElement)) {
            setTimeout(streamToCanvas, 100);
            return;
        }

        context.drawImage(videoElement, ...bounds);
        onDraw?.();

        window.setTimeout(streamToCanvas, 17);

    }, [context, bounds, onDraw, webcamVideoRef]);

    useEffect(() => {
        const listener = () => {
            streamToCanvas();
        };

        const wcvrc = webcamVideoRef.current;

        if (hasPermission && context) {
            if (!hasListener) {
                webcamVideoRef.current?.addEventListener('play', listener);
                setHasListener(true);
            }
        }
        return () => wcvrc?.removeEventListener('play', listener);
    }, [hasListener, hasPermission, context, streamToCanvas, webcamVideoRef]);

};
