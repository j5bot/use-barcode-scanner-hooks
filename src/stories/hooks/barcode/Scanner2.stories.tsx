import { ComponentStory } from '@storybook/react';
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

    const { webcamVideoRef, canvasRef, hasPermission } = useBarcodeScanner(zoom);
    
    return <div>
        {hasPermission ? <div className={'scan-canvas-container'}>
            <div className={'scan-canvas-video'}>
             <video ref={webcamVideoRef} width={videoWidth} height={videoHeight} />
            </div>
            <div className={'scan-canvas'}>
             <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
            </div>
         </div> : null}
    </div>;
};

export default {
    component: ScannerStories,
    title: 'Scanner/Combined Hook',
};

const Template: ComponentStory<typeof ScannerStories> = (args: any) => <ScannerStories {...args}/>

export const Scanner = Template.bind({});
Scanner.args = { zoom: 2, canvasWidth: 320, canvasHeight: 240, videoWidth: 640, videoHeight: 480 };