import { ComponentStory } from '@storybook/react';
import { useGetDeviceList } from '../../../../hooks';

const DeviceListStories = (props: any) => {
    const { hasPermission } = props;
    const { deviceList } = useGetDeviceList(hasPermission);

    return <div>
        Device List: <textarea readOnly={true} rows={10} cols={100} value={JSON.stringify(deviceList, undefined, 2)} />
    </div>;
};

export default {
    component: DeviceListStories,
    title: 'Camera/Device List',
};

const Template: ComponentStory<typeof DeviceListStories> = (args: any) => <DeviceListStories {...args}/>

export const DeviceListWithoutPermission = Template.bind({});
DeviceListWithoutPermission.args = {
    hasPermission: false,
};

export const DeviceListWithPermission = Template.bind({});
DeviceListWithPermission.args = {
    hasPermission: true,
};
