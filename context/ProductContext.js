import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import {
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductContext = createContext();

const STORAGE_KEY = 'SHOPPING_PRODUCTS';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const savedProducts = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }
    } catch (error) {
      Alert.alert(
        'Błąd',
        'Nie udało się wczytać zapisanych produktów.'
      );
    } finally {
      setLoading(false);
    }
  };

  const saveProducts = async (items) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      Alert.alert(
        'Błąd',
        'Nie udało się zapisać produktów.'
      );
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveProducts(products);
    }
  }, [products, loading]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        loading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};