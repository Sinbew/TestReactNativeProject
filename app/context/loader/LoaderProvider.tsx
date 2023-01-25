import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import LoaderContext from './Loader-context';


export interface AppProcessingProviderProps {
    children: React.ReactNode;
}

const LoaderProvider = observer(({children}: AppProcessingProviderProps) => {

    const [loading, setLoading] = useState<boolean>(false);

    const setLoader = () => {
        setLoading(loading);
    };
    return (
        <LoaderContext.Provider
            value={{loading, setLoading}}>
            {children}

        </LoaderContext.Provider>
    );
});

export default LoaderProvider;
