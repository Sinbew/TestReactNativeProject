import {injectable, inject} from 'inversify';
import {ILoaderService} from './loader-service-interface';
import {Type} from '../../ioc/type';
import {Loader} from '../../models/loader/loader';
import {LoaderState} from '../../state/loader/loader-state';

@injectable()
export class LoaderService implements ILoaderService {

    @inject(Type.LoaderState) public loaderState: LoaderState;

    public async getLoader(): Promise<void> {
        try {
            this.loaderState.getIsLoading();
        } catch (e) {
            console.warn(e);
        }
    }

    public async setLoader(isLoading: boolean): Promise<void> {
        try {
            await this.loaderState.setIsLoading(isLoading);
        } catch (e) {
            console.warn(e);
        }
    }
}
