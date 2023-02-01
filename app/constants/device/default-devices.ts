import {Device} from '../../models/device/device';
import {DeviceType} from '../../models/device/device-type';

const DefaultDevices: Device[] = [
    {
        type: DeviceType.HEALTHKIT,
        image: require('../../../assets/images/createUserDevices/healtkit.png')
    },
    {
        type: DeviceType.GARMIN,
        image: require('../../../assets/images/createUserDevices/garmin.png')
    },
    {
        type: DeviceType.SUUNTO,
        image: require('../../../assets/images/createUserDevices/suunto.png')
    },
    {
        type: DeviceType.POLAR,
        image: require('../../../assets/images/createUserDevices/polar.png')
    },
];

export default DefaultDevices;
