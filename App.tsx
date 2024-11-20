import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import {persistor, store} from './src/store/configureStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

export type RootStackNavigatorParamsList = {
  HomeScreen: undefined;
  CartScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackNavigatorParamsList>();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
              name="HomeScreen"
              options={{
                headerTitle: 'Welcome',
                headerTitleStyle: {
                  color: 'black',
                  fontSize: 20,
                },
              }}
              component={HomeScreen}
            />
            <Stack.Screen name="CartScreen" component={CartScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;
