'use client'
import { makeStore } from "./store";
import { Provider } from "react-redux";

interface ReduxProviderProps {
  children: React.ReactNode;
  preloadedState?: any;
}

export default function ReduxProvider({ children, preloadedState }: ReduxProviderProps) {
    const store = makeStore(preloadedState);
    
    return <Provider store={store}>{children}</Provider>;
    }
