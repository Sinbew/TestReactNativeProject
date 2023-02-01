import {action, makeObservable, observable} from 'mobx';
import {Device} from '../../models/device/device';
import {injectable} from 'inversify';

@injectable()
export class DeviceState {

    @observable private devices: Device[];

    constructor() {
        makeObservable(this);
        this.devices = [];
    }

    public getDevices(): Device[] {
        return this.devices;
    }

    @action
    public setDevices(value: Device[]) {
        this.devices = value;
    }
}
