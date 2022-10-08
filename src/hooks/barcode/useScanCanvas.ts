import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { BarcodeDetectorOptions, BarcodeFormat, DetectedBarcode } from '../../types/BarcodeDetector';

const { BarcodeDetectorPolyfill } = require('@undecaf/barcode-detector-polyfill');


declare let window: Window & typeof globalThis & {
    BarcodeDetector: typeof BarcodeDetectorPolyfill;
};

type DetectedBarcodes = Map<string, ImageBitmap>;

let barcodeDetector: typeof BarcodeDetectorPolyfill;
const barcodeDetectorOptions = { formats: [BarcodeFormat.EAN_13, BarcodeFormat.UPC_A] };

const getBarcodeDetector = async (options: BarcodeDetectorOptions) => {
    if (barcodeDetector) {
        return barcodeDetector;
    }
    const hasNative = 'BarcodeDetector' in window;
    if (!hasNative) {
        return BarcodeDetectorPolyfill.getSupportedFormats().then(() => {
            barcodeDetector = new BarcodeDetectorPolyfill(options);
            return Promise.resolve(barcodeDetector);
        })
    }
    barcodeDetector = new window.BarcodeDetector(options);
    return Promise.resolve(barcodeDetector);
};

export const useScanCanvas = (onScan?: (code: string) => void) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const detectedBarcodesRef = useRef<DetectedBarcodes>(new Map());

    const onDraw = () => {
        if (!canvasRef.current) {
            return Promise.resolve(undefined);
        }
        return createImageBitmap(canvasRef.current).then((bitmap: ImageBitmap) => {
            const detectedBarcodes = detectedBarcodesRef.current;
            return getBarcodeDetector(barcodeDetectorOptions).then(() => {
                return barcodeDetector?.detect(bitmap).then((barcodes: DetectedBarcode[]) => {
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
                });
            });
        });
    }

    return { onDraw, canvasRef, detectedBarcodesRef };
};