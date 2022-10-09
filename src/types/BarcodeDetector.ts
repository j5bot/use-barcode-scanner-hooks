import { ValueOf } from './index';

export const BarcodeFormat = {
    AZTEC: 'aztec',
    CODE_128: 'code_128',
    CODE_39: 'code_39',
    CODE_93: 'code_93',
    CODABAR: 'codabar',
    DATA_MATRIX: 'data_matrix',
    EAN_13: 'ean_13',
    EAN_8: 'ean_8',
    ITF: 'itf',
    PDF417: 'pdf417',
    QR_CODE: 'qr_code',
    UPC_A: 'upc_a',
    UPC_E: 'upc_e',
    UNKNOWN: 'unknown',
} as const;
export type BarcodeFormat = ValueOf<typeof BarcodeFormat>;

export type DetectedBarcode = {
    boundingBox: DOMRectReadOnly;
    cornerPoints: [number, number, number, number];
    format: BarcodeFormat;
    rawValue: string;
};

export type BarcodeDetectorOptions = {
    formats?: BarcodeFormat[];
};

interface BarcodeDetectorClass {
    new (options: BarcodeDetectorOptions): BarcodeDetector;
}

export type BarcodeDetector = BarcodeDetectorClass & {
    getSupportedFormats: () => Promise<BarcodeFormat[]>;
    detect: (source: ImageBitmapSource) => Promise<DetectedBarcode[]>;
};
