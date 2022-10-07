import { use2DContext, useScanCanvas, useVideoCanvas, useWebcam } from './barcode';

export const useBarcodeScanner = (zoom: number = 1) => {
    const { webcamVideoRef, hasPermission } = useWebcam();
    const { canvasRef, context } = use2DContext();
    const { onDraw, detectedBarcodesRef } = useScanCanvas(canvasRef, context);

    useVideoCanvas({
        onDraw,
        webcamVideoRef,
        canvasRef,
        hasPermission,
        context,
        zoom,
    });

    return {
        webcamVideoRef,
        canvasRef,
        detectedBarcodes: detectedBarcodesRef.current,
        hasPermission,
    };
};
