import {
    DeviceChoiceOptions,
    useScanCanvas,
    useVideoCanvas,
    useWebcam
} from './barcode';

export type UseBarcodeScannerOptions = {
    zoom?: number;
    onScan: (barcode: string) => void;
    onDevices?: (deviceList: MediaDeviceInfo[]) => void;
    deviceChoiceOptions?: DeviceChoiceOptions;
    shouldPlay?: boolean;
};

export const useBarcodeScanner = (options: UseBarcodeScannerOptions) => {
    const {
        zoom = 1,
        deviceChoiceOptions,
        onScan,
        onDevices,
        shouldPlay = true,
    } = options;
    const { webcamVideoRef, hasPermission, isStreaming, stream } = useWebcam({ deviceChoiceOptions, onDevices });
    const { onDraw, canDetect, canvasRef, detectedBarcodesRef } = useScanCanvas(onScan);

    useVideoCanvas({
        onDraw,
        webcamVideoRef,
        shouldDraw: canDetect,
        canvasRef,
        hasPermission,
        shouldPlay,
        zoom,
    });

    return {
        webcamVideoRef,
        canvasRef,
        stream,
        detectedBarcodes: detectedBarcodesRef.current,
        hasPermission,
        isStreaming,
    };
};
