import {ListenerType} from '../../constants/listener/listener-type';

export interface Listener {
    type: ListenerType;
    unsubscribe?: () => void;
}
