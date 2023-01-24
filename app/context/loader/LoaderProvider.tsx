import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

export interface AppProcessingProviderProps {
  children: React.ReactNode;
}

const LoaderProvider = observer(({children}: AppProcessingProviderProps) => {

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoaderContext.Provider
      value={}>
      {children}

    </LoaderContext.Provider>
  );
});

export default LoaderProvider;
