import React from 'react';
import { ComponentStory } from '@storybook/react';
import { useHasCameraPermission } from '../../../../hooks';

const CameraPermissionExample = (props: any) => {
    const { Component, ...rest } = props;
    return <Component {...rest} />
};

const HasCameraPermissionExample = () => {
    const { hasPermission } = useHasCameraPermission();
    return <div>
        Has Camera Permission: {hasPermission.toString()}
    </div>;
};

export default {
    component: CameraPermissionExample,
    title: 'Camera/Permission',
};

const Template: ComponentStory<typeof CameraPermissionExample> = (args: any) => <CameraPermissionExample {...args}/>

export const HasCameraPermission = Template.bind({});
HasCameraPermission.args = {
    Component: HasCameraPermissionExample,
};
