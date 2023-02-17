import {injectable} from 'inversify';
import {action, makeObservable, observable} from 'mobx';
import {Listener} from '../../models/listener/listener';
import {ListenerType} from '../../constants/listener/listener-type';

@injectable()
export class ListenerState {

    @observable private listeners: Listener[];

    constructor() {
        makeObservable(this);
        this.listeners = [
            {
                type: ListenerType.ON_NOTIFICATION_OPENED_APP,
            },
            {
                type: ListenerType.ON_MESSAGE,
            }
        ];
    }

    public getListeners() {
        return this.listeners;
    }

    @action
    public removeListener(listenerType: ListenerType) {
        const newListeners = [...this.listeners];
        newListeners.forEach(item => {
            if (item.type === listenerType) {
                item.unsubscribe = undefined;
            }
        });
        this.listeners = newListeners;
    }

    @action
    public addListener(listener: Listener) {
        const newListeners = [...this.listeners];
        newListeners.forEach(item => {
            if (item.type === listener.type) {
                item.unsubscribe = listener.unsubscribe;
            }
        });
        this.listeners = newListeners;
    }

    public findListener(listenerType: ListenerType): Listener {
        return this.listeners.find(item => item.type === listenerType)!;
    }
}
