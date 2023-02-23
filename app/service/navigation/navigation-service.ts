import {NavigationProp} from '@react-navigation/native';
import {injectable} from 'inversify';

@injectable()
export class NavigationService {
    private navigator: NavigationProp<any> | null;

    constructor() {
        this.navigator = null;
    }

    public getNavigator(): NavigationProp<any> | null {
        return this.navigator;
    }

    public navigate(key: string, params?: any) {
        if (this.navigator) {
            this.navigator.navigate(key, params);
        }
    }

    public setNavigator(navigator: NavigationProp<any>) {
        this.navigator = navigator;
    }
}
