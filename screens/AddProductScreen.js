import { useProducts } from '../context/ProductContext';
import React, { useState } from 'react';


import {
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

export default function AddProductScreen({ navigation }) {
  const { setProducts } = useProducts();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [shop, setShop] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Brak uprawnień', 'Zezwól na dostęp do galerii.');
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Brak uprawnień', 'Zezwól na dostęp do aparatu.');
      return;
    }

    const result =
      await ImagePicker.launchCameraAsync({
        quality: 1
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const add = () => {
    if (!name.trim() || !price.trim() || !shop.trim()) {
      Alert.alert('Błąd', 'Wypełnij nazwę, cenę i sklep.');
      return;
    }

    const parsedPrice = parseFloat(price.replace(',', '.'));

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Błąd', 'Cena musi być liczbą większą od 0.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: name.trim(),
      price: parsedPrice,
      shop: shop.trim(),
      description: description.trim(),
      image,
      bought: false
    };

    setProducts(prev => [newItem, ...prev]);

Haptics.notificationAsync(
  Haptics.NotificationFeedbackType.Success
);

navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#f4f6f8' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            padding: 15,
            flexGrow: 1
          }}
        >
          {image ? (
            <Image
  source={{ uri: image }}
  resizeMode="contain"
  style={{
    width: '100%',
    height: 260,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: 'white'
  }}
/>
          ) : (
            <View
              style={{
                height: 200,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: '#bbb',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 15,
                borderRadius: 10,
                backgroundColor: 'white'
              }}
            >
              <Ionicons name="image-outline" size={50} color="#999" />
              <Text style={{ color: '#666', marginTop: 10 }}>
                Brak zdjęcia
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={takePhoto}
            style={{
              backgroundColor: '#2196F3',
              padding: 12,
              borderRadius: 8,
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Ionicons name="camera-outline" size={20} color="white" />
            <Text style={{ color: 'white', marginLeft: 8, fontWeight: 'bold' }}>
              Zrób zdjęcie
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pickImage}
            style={{
              backgroundColor: '#555',
              padding: 12,
              borderRadius: 8,
              marginBottom: 15,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Ionicons name="images-outline" size={20} color="white" />
            <Text style={{ color: 'white', marginLeft: 8, fontWeight: 'bold' }}>
              Wybierz z galerii
            </Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Nazwa produktu"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
            style={inputStyle}
          />

          <TextInput
            placeholder="Cena (np. 9,99)"
            placeholderTextColor="#666"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            style={inputStyle}
          />

          <TextInput
            placeholder="Sklep"
            placeholderTextColor="#666"
            value={shop}
            onChangeText={setShop}
            style={inputStyle}
          />

          <TextInput
            placeholder="Opis produktu"
            placeholderTextColor="#666"
            value={description}
            onChangeText={setDescription}
            multiline
            style={[inputStyle, { height: 100 }]}
          />

          <TouchableOpacity
            onPress={add}
            style={{
              backgroundColor: '#ff9800',
              padding: 14,
              borderRadius: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10
            }}
          >
            <Ionicons name="add-circle-outline" size={22} color="white" />
            <Text style={{ color: 'white', marginLeft: 8, fontWeight: 'bold' }}>
              Dodaj produkt
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 12,
  marginBottom: 10,
  backgroundColor: 'white',
  color: '#111'
};