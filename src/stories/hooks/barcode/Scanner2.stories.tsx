import React from 'react';
import { ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { useBarcodeScanner } from '../../../hooks';

import './Scan.css';

type ScannerStoriesProps = {
    canvasWidth?: number;
    canvasHeight?: number;
    videoWidth?: number;
    videoHeight?: number;
    zoom?: number;
}

const ScannerStories = (props: ScannerStoriesProps) => {
    const {
        canvasWidth = 320,
        canvasHeight = 240,
        videoWidth = 640,
        videoHeight = 480,
        zoom = 1,
    } = props;

    const [codes, setCodes] = useState<string[]>([]);

    const onScan = (code: string) => {
        setCodes(codes.concat(code));
    };

    const { webcamVideoRef, canvasRef, hasPermission, stream } = useBarcodeScanner({ zoom, onScan });
    
    return <div>
        {hasPermission && stream ? <div className={'scan-canvas-container'}>
            <div className={'scan-canvas-video'}>
             <video ref={webcamVideoRef} width={videoWidth} height={videoHeight} />
            </div>
            <div className={'scan-canvas'}>
             <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
            </div>
            <div className={'scanned-codes'}>
                <textarea rows={10} cols={100} readOnly={true} value={codes.join('\n')} />
            </div>
         </div>
         : null}
    </div>;
};

export default {
    component: ScannerStories,
    title: 'Scanner/Combined Hook',
};

const Template: ComponentStory<typeof ScannerStories> = (args: any) => <ScannerStories {...args}/>

export const CombinedHook = Template.bind({});
CombinedHook.args = { zoom: 2, canvasWidth: 320, canvasHeight: 240, videoWidth: 640, videoHeight: 480 };