import React from 'react';
import { ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { BarcodeScanner as BarcodeScannerComponent } from '../../components';
import { BarcodeScannerProps } from '../../components';

const BarcodeScannerStories = (props: BarcodeScannerProps & { scanLine?: boolean }) => {
    const {
        scanLine = false,
        canvasHeight = 240,
        canvasWidth = 320,
        videoHeight = 480,
        videoWidth = 640,
        videoCropHeight,
        videoCropWidth,
        zoom = 1,
        blur = 0,
    } = props;

    const [codes, setCodes] = useState<string[]>([]);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

    const onScan = (code: string) => {
        setCodes(codes.concat(code));
    };
    const onDevices = (devices: MediaDeviceInfo[]) => {
        setDevices(devices);
    };

    return <BarcodeScannerComponent
        devices={devices}
        onDevices={onDevices}
        onScan={onScan}
        settings={{
            scanLine
        }}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        videoWidth={videoWidth}
        videoHeight={videoHeight}
        videoCropHeight={videoCropHeight}
        videoCropWidth={videoCropWidth}
        zoom={zoom}
        blur={blur}
        />
};

export default {
    component: BarcodeScannerStories,
    title: 'Components/BarcodeScanner',
};

const Template: ComponentStory<typeof BarcodeScannerStories> = (args: any) => <BarcodeScannerStories {...args}/>

export const BarcodeScanner = Template.bind({});
BarcodeScanner.args = {
    scanLine: false,
    zoom: 2,
    blur: 3,
    canvasHeight: 240,
    canvasWidth: 320,
    videoHeight: 480,
    videoWidth: 640,
    videoCropHeight: 300,
    videoCropWidth: 640,
};