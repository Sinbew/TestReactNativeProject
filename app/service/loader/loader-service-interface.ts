import {Loader} from '../../models/loader/loader';

export interface ILoaderService {

    getLoader(): Promise<void>;

    setLoader(isLoading: boolean): Promise<void>;
}
