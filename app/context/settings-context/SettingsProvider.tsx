import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import SettingsContext from './settings-context';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


export interface AppProcessingProviderProps {
    children: React.ReactNode;
}


const SettingsProvider = observer(({children}: AppProcessingProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [incomeError, setIncomeError] = useState<Error | null>(null);
    const showLoader = (loading: boolean) => {
        setIsLoading(loading);
    };

    const showError = (error: Error) => {
        setIncomeError(error);
    };


    const renderLoaderView = () => {
        if (isLoading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator color={'#fff'} size={'large'}/>
                </View>
            );
        }
        return null;
    };

    const hide = () => {
        setIncomeError(null);
    };


    const renderErrorView = () => {
        if (incomeError) {
            return (
                <TouchableOpacity onPress={hide} activeOpacity={1} style={styles.error}>
                    <View>
                        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>Oops, something went wrong.</Text>
                        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>{incomeError.message}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return null;
    };


    return (
        <SettingsContext.Provider
            value={{showLoader, showError}}>
            {children}
            {renderLoaderView()}
            {renderErrorView()}
        </SettingsContext.Provider>
    );
});

const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(1, 1, 1, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',

    },
    error: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(1, 1, 1, 0.8)',
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.3,
        flex: 1,
    }
});

export default SettingsProvider;
