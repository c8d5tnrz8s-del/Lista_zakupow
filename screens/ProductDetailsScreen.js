import React from 'react';

import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function ProductDetailsScreen({ route }) {

  if (!route.params?.product) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Nie znaleziono produktu.</Text>
      </View>
    );
  }

  const { product } = route.params;

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 15,
        backgroundColor: '#f4f6f8',
        flexGrow: 1
      }}
    >

      {/* ZDJĘCIE */}
      {product.image && (
        <Image
          source={{ uri: product.image }}
          style={{
            width: '100%',
            height: 260,
            borderRadius: 12,
            marginBottom: 15,
            backgroundColor: 'white'
          }}
          resizeMode="contain"
        />
      )}

      {/* KARTA */}
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 12
        }}
      >

        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          {product.name}
        </Text>

        <Text style={{ marginTop: 10, color: 'green', fontWeight: 'bold' }}>
          Cena: {product.price} zł
        </Text>

        <Text style={{ marginTop: 10 }}>
          Sklep: {product.shop}
        </Text>

        <Text style={{ marginTop: 15, fontWeight: 'bold' }}>
          Opis:
        </Text>

        <Text style={{ marginTop: 5, color: '#444' }}>
          {product.description || 'Brak opisu'}
        </Text>

        <Text
          style={{
            marginTop: 20,
            fontWeight: 'bold',
            color: product.bought ? 'green' : '#ff9800'
          }}
        >
          {product.bought ? '✓ Kupiony' : '🛒 Do kupienia'}
        </Text>

      </View>
    </ScrollView>
  );
}