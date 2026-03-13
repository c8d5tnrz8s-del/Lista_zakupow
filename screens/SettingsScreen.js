import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

import { useProducts } from '../context/ProductContext';
import { theme } from '../theme';

export default function SettingsScreen({ setIsLoggedIn }) {
  const { products } = useProducts();

  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const boughtCount = products.filter(product => product.bought).length;
  const notBoughtCount = products.filter(product => !product.bought).length;

  const getLocation = async () => {
    try {
      setLoadingLocation(true);

      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Brak uprawnień',
          'Zezwól aplikacji na dostęp do lokalizacji.'
        );
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({});

      setLocation(currentLocation.coords);
    } catch (error) {
      Alert.alert(
        'Błąd',
        'Nie udało się pobrać lokalizacji.'
      );
    } finally {
      setLoadingLocation(false);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.card,
          padding: theme.spacing.lg,
          borderRadius: theme.radius.md,
          marginBottom: theme.spacing.lg
        }}
      >
        <Text
          style={{
            fontSize: theme.fontSize.title,
            fontWeight: 'bold',
            color: theme.colors.text
          }}
        >
          Statystyki listy
        </Text>

        <Text
          style={{
            marginTop: theme.spacing.lg,
            fontSize: theme.fontSize.normal,
            color: theme.colors.text
          }}
        >
          Wszystkie produkty: {products.length}
        </Text>

        <Text
          style={{
            marginTop: theme.spacing.sm,
            fontSize: theme.fontSize.normal,
            color: theme.colors.success
          }}
        >
          Kupione: {boughtCount}
        </Text>

        <Text
          style={{
            marginTop: theme.spacing.sm,
            fontSize: theme.fontSize.normal,
            color: theme.colors.warning
          }}
        >
          Do kupienia: {notBoughtCount}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: theme.colors.card,
          padding: theme.spacing.lg,
          borderRadius: theme.radius.md
        }}
      >
        <Text
          style={{
            fontSize: theme.fontSize.title,
            fontWeight: 'bold',
            color: theme.colors.text
          }}
        >
          Lokalizacja sklepu
        </Text>

        <Text
          style={{
            marginTop: theme.spacing.sm,
            color: theme.colors.textLight
          }}
        >
          Aplikacja może pobrać aktualną lokalizację użytkownika, np. podczas zakupów.
        </Text>

        {location && (
          <View style={{ marginTop: theme.spacing.lg }}>
            <Text style={{ color: theme.colors.text }}>
              Szerokość: {location.latitude.toFixed(5)}
            </Text>

            <Text
              style={{
                marginTop: theme.spacing.xs,
                color: theme.colors.text
              }}
            >
              Długość: {location.longitude.toFixed(5)}
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={getLocation}
          style={{
            backgroundColor: theme.colors.primary,
            padding: theme.spacing.lg,
            borderRadius: theme.radius.sm,
            marginTop: theme.spacing.xl,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {loadingLocation ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons
                name="location-outline"
                size={22}
                color="white"
              />

              <Text
                style={{
                  color: 'white',
                  marginLeft: theme.spacing.sm,
                  fontWeight: 'bold'
                }}
              >
                Pobierz lokalizację
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: theme.colors.danger,
          padding: theme.spacing.lg,
          borderRadius: theme.radius.sm,
          marginTop: theme.spacing.lg,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Ionicons
          name="log-out-outline"
          size={22}
          color="white"
        />

        <Text
          style={{
            color: 'white',
            marginLeft: theme.spacing.sm,
            fontWeight: 'bold'
          }}
        >
          Wyloguj
        </Text>
      </TouchableOpacity>
    </View>
  );
}