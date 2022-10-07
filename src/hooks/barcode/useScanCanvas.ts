import { MutableRefObject, useRef } from 'react';
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
            return Promise.resolve(new BarcodeDetectorPolyfill(options));
        })
    }
    return Promise.resolve(new window.BarcodeDetector(options));
};

export const useScanCanvas = (canvasRef: MutableRefObject<HTMLCanvasElement | null>, context?: CanvasRenderingContext2D | null) => {
    const detectedBarcodesRef = useRef<DetectedBarcodes>(new Map());

    const onDraw = () => {
        if (!(canvasRef.current && context)) {
            return Promise.resolve(undefined);
        }
        return createImageBitmap(context?.canvas ?? new Image(1,1)).then((bitmap: ImageBitmap) => {
            const detectedBarcodes = detectedBarcodesRef.current;
            return getBarcodeDetector(barcodeDetectorOptions).then(() => {
                return barcodeDetector?.detect(bitmap).then((barcodes: DetectedBarcode[]) => {
                    // console.log(JSON.stringify(barcodes));
                    // console.log(detectedBarcodes.size);
                    if (
                        barcodes.length > 0 && barcodes.filter((code: DetectedBarcode) => !detectedBarcodes.has(code.rawValue)).length > 0
                    ) {
                        barcodes.forEach((barcode: DetectedBarcode) => {
                            if (detectedBarcodes.has(barcode.rawValue)) {
                                return;
                            }
                            detectedBarcodes.set(barcode.rawValue, bitmap);
                        });
                    }
                });
            });
        });
    }

    return { onDraw, detectedBarcodesRef };
};