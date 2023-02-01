import {IDeviceService} from './device-service-interface';
import {inject, injectable} from 'inversify';
import {Type} from '../../ioc/type';
import {DeviceState} from '../../state/device/device-state';
import DefaultDevices from '../../constants/device/default-devices';

@injectable()
export class DeviceService implements IDeviceService {

    @inject(Type.DeviceState) private deviceState: DeviceState;

    public initDevices() {
        const devices = this.deviceState.getDevices();
        if (devices.length === 0) {
            this.deviceState.setDevices(DefaultDevices);
        }
    }
}
