import { createContext } from 'react';


export interface ILoaderContext {
  showLoader: (loading: boolean) => void;
}

const LoaderContext = createContext<ILoaderContext>({
  showLoader: () => {
  }
});

export default LoaderContext;
