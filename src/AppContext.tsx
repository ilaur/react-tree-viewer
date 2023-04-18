import { createContext, useContext, useReducer, ReactNode } from 'react';
import { ParameterNode, AccountInfo } from './requests/types';

type AppState = {
  accountInfo: AccountInfo | undefined;
  parameters: ParameterNode | null;
  selectedNodeId: string | undefined;
};

export type Action =
  | {
      type: 'logout';
    }
  | {
      type: 'login';
      accountInfo: AccountInfo | undefined;
    }
  | {
      type: 'removeParamaters';
    }
  | {
      type: 'addParameters';
      parameters: ParameterNode | null;
    }
  | {
      type: 'selectedNodeId';
      selectedNodeId: string | undefined;
    };

type AppContextType = AppState & {
  dispatch: React.Dispatch<Action>;
};

type Props = {
  children: ReactNode;
};

const initialAppState = {
  accountInfo: undefined,
  parameters: null,
  selectedNodeId: undefined,
};

const AppContext = createContext<AppContextType>({
  ...initialAppState,
  dispatch: () => {},
});

function reducer(appState: AppState, action: Action): AppState {
  switch (action.type) {
    case 'logout':
      return { ...appState, accountInfo: undefined };
    case 'login':
      return { ...appState, accountInfo: action.accountInfo };
    case 'removeParamaters':
      return { ...appState, parameters: null };
    case 'addParameters':
      return { ...appState, parameters: action.parameters };
    case 'selectedNodeId':
      return { ...appState, selectedNodeId: action.selectedNodeId };
    default:
      return appState;
  }
}

export function AppContextProvider({ children }: Props) {
  const [{ accountInfo, parameters, selectedNodeId }, dispatch] = useReducer(
    reducer,
    initialAppState,
  );

  return (
    <AppContext.Provider
      value={{
        accountInfo,
        parameters,
        selectedNodeId,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
