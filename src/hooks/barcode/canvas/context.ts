import { useEffect, useRef, useState } from 'react';

export const use2DContext = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>();

    useEffect(() => {
        if (canvasRef.current) {
            setContext(canvasRef.current?.getContext('2d'));
        }
    }, [setContext]);

    return { canvasRef, context };
};
