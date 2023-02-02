import {Device} from '../../models/device/device';
import {DeviceType} from '../../models/device/device-type';

const DefaultDevices: Device[] = [
    {
        type: DeviceType.HEALTHKIT,
        image: require('../../../assets/images/devices/healtkit.png')
    },
    {
        type: DeviceType.GARMIN,
        image: require('../../../assets/images/devices/garmin.png')
    },
    {
        type: DeviceType.SUUNTO,
        image: require('../../../assets/images/devices/suunto.png')
    },
    {
        type: DeviceType.POLAR,
        image: require('../../../assets/images/devices/polar.png')
    },
];

export default DefaultDevices;
