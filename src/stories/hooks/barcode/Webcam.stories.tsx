import React from 'react';
import { ComponentStory } from '@storybook/react';
import { useWebcam } from '../../../hooks';

const WebcamStories = (props: any) => {
    const { webcamVideoRef, hasPermission } = useWebcam({ shouldPlay: true });

    return <div>
        {hasPermission ?
            <video ref={webcamVideoRef} width={640} height={480} />
         : null}
    </div>;
};

export default {
    component: WebcamStories,
    title: 'Video/Webcam',
};

const Template: ComponentStory<typeof WebcamStories> = (args: any) => <WebcamStories {...args}/>

export const Webcam = Template.bind({});
Webcam.args = {};
