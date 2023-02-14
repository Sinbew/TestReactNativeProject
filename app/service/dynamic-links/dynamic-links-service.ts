import {IDynamicLinksService} from './dynamic-links-service-interface';
import {inject, injectable} from 'inversify';
import {Type} from '../../ioc/type';
import {NavigationService} from '../navigation/navigation-service';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {Route} from '../../constants/route';

@injectable()
export class DynamicLinksService implements IDynamicLinksService {
    @inject(Type.NavigationService) private navigationService: NavigationService;

    public async getInitialLinkInBackground(): Promise<any> {
        const dynamicLinkUrl = await dynamicLinks().getInitialLink();
        if (dynamicLinkUrl) {
            this.navigationService.navigate(Route.NOTIFICATIONS_SCREEN);
        }
    }
}

