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
};

export const useBarcodeScanner = (options: UseBarcodeScannerOptions) => {
    const { zoom = 1, deviceChoiceOptions, onScan, onDevices } = options;
    const { webcamVideoRef, hasPermission } = useWebcam({ deviceChoiceOptions, onDevices });
    const { onDraw, canvasRef, detectedBarcodesRef } = useScanCanvas(onScan);

    useVideoCanvas({
        onDraw,
        webcamVideoRef,
        canvasRef,
        hasPermission,
        shouldPlay: true,
        zoom,
    });

    return {
        webcamVideoRef,
        canvasRef,
        detectedBarcodes: detectedBarcodesRef.current,
        hasPermission,
    };
};
