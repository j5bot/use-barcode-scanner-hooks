import { useRef, useState } from 'react';
import { BarcodeDetector, BarcodeDetectorOptions, BarcodeFormat, DetectedBarcode } from '../../types';
import { BarcodeDetectorPolyfill } from '@undecaf/barcode-detector-polyfill';


declare let window: Window & typeof globalThis & {
    BarcodeDetector: BarcodeDetector;
};

type DetectedBarcodes = Map<string, ImageBitmap>;

let barcodeDetector: BarcodeDetector;
const barcodeDetectorOptions = { formats: [BarcodeFormat.EAN_13, BarcodeFormat.UPC_A] };

const getBarcodeDetector = async (options: BarcodeDetectorOptions) => {
    if (barcodeDetector) {
        return barcodeDetector;
    }
    const hasNative = 'BarcodeDetector' in window;
    if (!hasNative) {
        window.BarcodeDetector = (
            BarcodeDetectorPolyfill as unknown
        ) as BarcodeDetector;
    }
    return window.BarcodeDetector.getSupportedFormats().then((formats: BarcodeFormat[]) => {
        if (formats.length === 0) {
            return Promise.reject('No barcode detection');
        }
        barcodeDetector = (new window.BarcodeDetector(options) as unknown) as BarcodeDetector;
        return Promise.resolve(barcodeDetector);
    });
};

export const useScanCanvas = (onScan?: (code: string) => void) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const detectedBarcodesRef = useRef<DetectedBarcodes>(new Map());
    const [canDetect, setCanDetect] = useState<boolean>(true);

    const onDraw = () => {
        if (!(canvasRef.current && canDetect)) {
            return Promise.resolve(undefined);
        }
        return getBarcodeDetector(barcodeDetectorOptions)
            .then((barcodeDetector: BarcodeDetector) => {
                if (!canvasRef.current) {
                    return Promise.resolve(undefined);
                }
                return createImageBitmap(canvasRef.current).then((bitmap: ImageBitmap) => {
                    const detectedBarcodes = detectedBarcodesRef.current;
                    return barcodeDetector?.detect(bitmap)
                        .then((barcodes: DetectedBarcode[]) => {
                            if (
                                barcodes.length > 0 && barcodes.filter((code: DetectedBarcode) => !detectedBarcodes.has(code.rawValue)).length > 0
                            ) {
                                barcodes.forEach((barcode: DetectedBarcode) => {
                                    if (detectedBarcodes.has(barcode.rawValue)) {
                                        return;
                                    }
                                    detectedBarcodes.set(barcode.rawValue, bitmap);
                                    onScan?.(barcode.rawValue);
                                });
                            }
                        }).catch((error) => {
                            console.log('unable to detect', error);
                        });
                });
            }).catch((error) => {
                setCanDetect(false);
            });
    };

    return { onDraw, canDetect, canvasRef, detectedBarcodesRef };
};