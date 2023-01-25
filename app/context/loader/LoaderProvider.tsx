import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import LoaderContext from './loader-context';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


export interface AppProcessingProviderProps {
  children: React.ReactNode;
}

const LoaderProvider = observer(({children}: AppProcessingProviderProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showLoader = (loading: boolean) => {
    setIsLoading(loading);
  };

  const renderLoaderView = () => {
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color={'#fff'} size='large' />
        </View>
      );
    }
    return null;
  };

  return (
    <LoaderContext.Provider
      value={{showLoader}}>
      {children}
      {renderLoaderView()}
    </LoaderContext.Provider>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(1, 1, 1, 0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LoaderProvider;
