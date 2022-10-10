import React, { CSSProperties } from 'react';
import { useBarcodeScanner } from 'use-barcode-scanner/dist/hooks/esm';

import './BarcodeScanner.css';

export type BarcodeScannerProps = {
    autoStart?: boolean;
    canvasHeight?: number;
    canvasWidth?: number;
    devices?: MediaDeviceInfo[];
    onDevices?: (devices: MediaDeviceInfo[]) => void;
    onScan: (code: string) => void;
    preferDeviceLabelMatch?: RegExp;
    settings?: Record<string, boolean | RegExp>;
    videoHeight?: number;
    videoWidth?: number;
    videoCropHeight?: number;
    videoCropWidth?: number;
    zoom?: number;
    blur?: number;
};

export const BarcodeScanner = (props: BarcodeScannerProps) => {
    const {
        autoStart = true,
        canvasHeight = 240,
        canvasWidth = 320,
        devices,
        onDevices,
        onScan,
        settings,
        videoHeight = 480,
        videoWidth = 640,
        videoCropHeight = 300,
        videoCropWidth = 640,
        zoom = 1,
        blur = 0,
    } = props;

    const webcamScannerPreviewBoxStyle = {
        '--assume-video-width': `${videoWidth}px`,
        '--assume-video-height': `${videoHeight}px`,
        '--video-crop-width': `${videoCropWidth}px`,
        '--video-crop-height': `${videoCropHeight}px`,
        '--assume-zoom': zoom,
        '--video-blur': `${blur}px`,
    } as CSSProperties;

    const {
        canvasRef,
        hasPermission,
        webcamVideoRef,
    } = useBarcodeScanner({
        onDevices,
        onScan,
        shouldPlay: false,
        zoom,
    });

    return (hasPermission && devices?.length ?
        <>
            <div
                className="webcam-scanner-preview-box"
                style={webcamScannerPreviewBoxStyle}
            >
                <div className="webcam-scanner-preview">
                    <video
                        ref={webcamVideoRef}
                        width={videoWidth}
                        height={videoHeight}
                        autoPlay={autoStart}
                        playsInline={true}
                    />
                    {/*<div className={'match-canvas'}> </div>*/}
                    <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
                    {settings?.scanLine && <div className={'scanline'}>-</div>}
                </div>
            </div>
        </>
    : null);
};
