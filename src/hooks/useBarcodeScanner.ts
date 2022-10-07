import {
    DeviceChoiceOptions,
    use2DContext,
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
    const { webcamVideoRef, hasPermission } = useWebcam(deviceChoiceOptions, onDevices);
    const { canvasRef, context } = use2DContext();
    const { onDraw, detectedBarcodesRef } = useScanCanvas(canvasRef, onScan);

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
