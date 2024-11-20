import {jest} from '@jest/globals';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('redux-persist/integration/react', () => {
  const actualReduxPersistIntegration = jest.requireActual(
    'redux-persist/integration/react',
  );
  return {
    ...actualReduxPersistIntegration,
    PersistGate: ({children, loading, persistor}) => {
      if (!persistor) return null;
      return children;
    },
  };
});

jest.mock('redux-persist', () => {
  const actualReduxPersist = jest.requireActual('redux-persist');
  return {
    ...actualReduxPersist,
    persistStore: () => ({
      purge: jest.fn(),
      flush: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(),
      subscribe: jest.fn(),
      get bootstrapped() {
        return true;
      },
    }),
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      setOptions: jest.fn(),
    }),
  };
});
