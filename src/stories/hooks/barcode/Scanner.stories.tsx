import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';
import { useScanCanvas, useVideoCanvas, useWebcam } from '../../../hooks';

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

    const { webcamVideoRef, hasPermission } = useWebcam({ shouldPlay: true });
    const { onDraw, canDetect, canvasRef } = useScanCanvas(onScan);

    useVideoCanvas({
        onDraw,
        webcamVideoRef,
        shouldDraw: canDetect,
        canvasRef,
        hasPermission,
        zoom,
    });

    return <div>
        {hasPermission ? <div className={'scan-canvas-container'}>
            <div className={'scan-canvas-video'}>
             <video ref={webcamVideoRef} width={videoWidth} height={videoHeight} />
            </div>
            <div className={'scan-canvas'}>
             <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
            </div>
            <div className={'scanned-codes'}>
                <textarea rows={10} cols={100} readOnly={true} value={codes.join('\n')} />
            </div>
        </div> : null}
    </div>;
};

export default {
    component: ScannerStories,
    title: 'Scanner/Separate Hooks',
};

const Template: ComponentStory<typeof ScannerStories> = (args: any) => <ScannerStories {...args}/>

export const SeparateHooks = Template.bind({});
SeparateHooks.args = { zoom: 2, canvasWidth: 320, canvasHeight: 240, videoWidth: 640, videoHeight: 480 };