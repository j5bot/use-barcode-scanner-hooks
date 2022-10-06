import { ComponentStory } from '@storybook/react';
import { useWebcam } from '../../../hooks/barcode/useWebcam';

const WebcamStories = (props: any) => {
    const { webcamVideoRef, hasPermission } = useWebcam();

    return <div>
        {hasPermission ?
            <video ref={webcamVideoRef} width={640} height={480} />
         : null}
    </div>;
};

export default {
    component: WebcamStories,
    title: 'Camera/Webcam',
};

const Template: ComponentStory<typeof WebcamStories> = (args: any) => <WebcamStories {...args}/>

export const Webcam = Template.bind({});
Webcam.args = {};
