import { createContext, useContext, useReducer, ReactNode } from 'react';
import { ParameterNode, AccountInfo } from './requests/types';

type AppState = {
  accountInfo: AccountInfo | undefined;
  parameters: ParameterNode | null;
  selectedNode: string | undefined;
};

type Action =
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
      type: 'selectedNode';
      selectedNode: string | undefined;
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
  selectedNode: undefined,
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
    case 'selectedNode':
      return { ...appState, selectedNode: action.selectedNode };
    default:
      return appState;
  }
}

export function AppContextProvider({ children }: Props) {
  const [{ accountInfo, parameters, selectedNode }, dispatch] = useReducer(
    reducer,
    initialAppState,
  );

  return (
    <AppContext.Provider
      value={{
        accountInfo,
        parameters,
        selectedNode,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
