import React, {
  useState,
  useLayoutEffect
} from 'react';

import {
  View,
  Text,
  SectionList,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  useWindowDimensions
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

import { useProducts } from '../context/ProductContext';
import { theme } from '../theme';

export default function HomeScreen({ navigation }) {
  const {
    products,
    setProducts,
    loading
  } = useProducts();

  const [filter, setFilter] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={{
            marginRight: theme.spacing.md,
            width: 36,
            height: 36,
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Ionicons
            name="settings-outline"
            size={26}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background
        }}
      >
        <ActivityIndicator
          size="large"
          color={theme.colors.warning}
        />

        <Text
          style={{
            marginTop: theme.spacing.sm,
            color: theme.colors.text
          }}
        >
          Wczytywanie produktów...
        </Text>
      </View>
    );
  }

  const toggleBought = (id) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, bought: !product.bought }
          : product
      )
    );

    Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Light
    );
  };

  const deleteProduct = (id) => {
    Alert.alert(
      'Usuń produkt',
      'Czy na pewno chcesz usunąć produkt?',
      [
        {
          text: 'Anuluj',
          style: 'cancel'
        },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: () => {
            setProducts(prev =>
              prev.filter(p => p.id !== id)
            );

            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Warning
            );
          }
        }
      ]
    );
  };

  const filtered = products
    .filter(product =>
      (product.shop || '')
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? a.price - b.price
        : b.price - a.price
    );

  const sections = [
    {
      title: 'Do kupienia',
      data: filtered.filter(p => !p.bought)
    },
    {
      title: 'Kupione',
      data: filtered.filter(p => p.bought)
    }
  ];

  return (
    <View
      style={{
        flex: 1,
        padding: isTablet
          ? theme.spacing.xl
          : theme.spacing.lg,
        backgroundColor: theme.colors.background
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: theme.colors.warning,
          padding: theme.spacing.md,
          marginBottom: theme.spacing.sm,
          borderRadius: theme.radius.sm,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Ionicons
          name="add-circle-outline"
          size={20}
          color="white"
        />

        <Text
          style={{
            color: 'white',
            marginLeft: theme.spacing.sm,
            fontWeight: 'bold'
          }}
        >
          Dodaj produkt
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: theme.colors.textLight,
          padding: theme.spacing.md,
          marginBottom: theme.spacing.sm,
          borderRadius: theme.radius.sm
        }}
        onPress={() => setSortAsc(!sortAsc)}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center'
          }}
        >
          Sortowanie:
          {sortAsc ? ' rosnąco' : ' malejąco'}
        </Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Filtruj po sklepie"
        placeholderTextColor={theme.colors.textLight}
        value={filter}
        onChangeText={setFilter}
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
          color: theme.colors.text,
          padding: theme.spacing.md,
          marginBottom: theme.spacing.sm,
          borderRadius: theme.radius.sm
        }}
      />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => (
              <TouchableOpacity
                onPress={() => deleteProduct(item.id)}
                style={{
                  backgroundColor: theme.colors.danger,
                  justifyContent: 'center',
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.md,
                  marginVertical: theme.spacing.xs
                }}
              >
                <Ionicons
                  name="trash"
                  size={22}
                  color="white"
                />
              </TouchableOpacity>
            )}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  'Details',
                  { product: item }
                )
              }
              onLongPress={() => toggleBought(item.id)}
              style={{
                backgroundColor: theme.colors.card,
                padding: theme.spacing.lg,
                marginVertical: theme.spacing.xs,
                borderRadius: theme.radius.md,
                elevation: 2
              }}
            >
              <Text
                style={{
                  fontSize: theme.fontSize.normal,
                  fontWeight: 'bold',
                  color: theme.colors.text,
                  textDecorationLine:
                    item.bought ? 'line-through' : 'none'
                }}
              >
                {item.name}
              </Text>

              <Text
                style={{
                  color: theme.colors.success,
                  fontWeight: 'bold',
                  marginTop: theme.spacing.xs
                }}
              >
                Cena: {item.price} zł
              </Text>

              <Text
                style={{
                  marginTop: theme.spacing.xs,
                  color: theme.colors.textLight
                }}
              >
                Sklep: {item.shop}
              </Text>

              <Text
                style={{
                  marginTop: theme.spacing.sm,
                  color: item.bought
                    ? theme.colors.success
                    : theme.colors.warning
                }}
              >
                {item.bought ? '✓ Kupiony' : '🛒 Do kupienia'}
              </Text>
            </TouchableOpacity>
          </Swipeable>
        )}
        renderSectionHeader={({ section }) => (
          <Text
            style={{
              fontSize: theme.fontSize.title,
              fontWeight: 'bold',
              color: theme.colors.text,
              marginTop: theme.spacing.lg,
              marginBottom: theme.spacing.xs
            }}
          >
            {section.title}
          </Text>
        )}
      />
    </View>
  );
}