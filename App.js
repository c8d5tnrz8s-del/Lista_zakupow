import 'react-native-gesture-handler';
import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddProductScreen from './screens/AddProductScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import SettingsScreen from './screens/SettingsScreen';

import { ProductProvider } from './context/ProductContext';
import ErrorBoundary from './ErrorBoundary';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ErrorBoundary>
      <ProductProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: 'center',
              headerBackTitle: '',
              headerBackButtonDisplayMode: 'minimal'
            }}
          >
            {!isLoggedIn ? (
              <Stack.Screen
                name="Login"
                options={{
                  title: 'Logowanie',
                  headerBackVisible: false,
                  gestureEnabled: false
                }}
              >
                {(props) => (
                  <LoginScreen
                    {...props}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                )}
              </Stack.Screen>
            ) : (
              <>
                <Stack.Screen
                  name="Home"
                  options={{
                    title: 'Lista zakupów',
                    headerBackVisible: false,
                    gestureEnabled: false
                  }}
                >
                  {(props) => (
                    <HomeScreen {...props} />
                  )}
                </Stack.Screen>

                <Stack.Screen
                  name="AddProduct"
                  component={AddProductScreen}
                  options={{
                    title: 'Dodaj produkt'
                  }}
                />

                <Stack.Screen
                  name="Details"
                  component={ProductDetailsScreen}
                  options={{
                    title: 'Szczegóły produktu'
                  }}
                />

                <Stack.Screen
                  name="Settings"
                  options={{
                    title: 'Ustawienia'
                  }}
                >
                  {(props) => (
                    <SettingsScreen
                      {...props}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  )}
                </Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ProductProvider>
    </ErrorBoundary>
  );
}