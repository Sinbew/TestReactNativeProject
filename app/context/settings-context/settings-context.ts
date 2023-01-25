import {createContext} from 'react';


export interface ISettingsInterface {
    showLoader: (loading: boolean) => void;
    showError: (error: Error) => void;
}

const SettingsContext = createContext<ISettingsInterface>({
    showLoader: () => {
    }, showError: () => {
    }
});

export default SettingsContext;
