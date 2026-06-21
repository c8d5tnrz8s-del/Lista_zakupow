# Lista zakupów – React Native Expo

Aplikacja mobilna do zarządzania listą zakupów, wykonana w React Native z użyciem Expo Snack. Projekt został przygotowany jako aplikacja zaliczeniowa z wykorzystaniem React Native, Expo, Context API, AsyncStorage, funkcji natywnych urządzenia oraz nawigacji między ekranami.

## Demo projektu

Link do aplikacji w Expo Snack:

https://snack.expo.dev/@m_makowska/lista_zakupow

## Dane logowania

Login:

```txt
admin
```

Hasło:

```txt
1234
```

## Opis aplikacji

Aplikacja umożliwia tworzenie i zarządzanie listą zakupów. Użytkownik może dodawać produkty, wpisywać cenę, sklep oraz opis, dodawać zdjęcie z galerii lub aparatu, oznaczać produkty jako kupione, usuwać produkty gestem swipe oraz filtrować i sortować listę.

Dane są zapisywane lokalnie w pamięci urządzenia, dlatego aplikacja działa także po zamknięciu i ponownym uruchomieniu.

## Funkcjonalności

- logowanie użytkownika,
- dodawanie produktów,
- walidacja formularza,
- obsługa ceny z przecinkiem i kropką,
- dodawanie zdjęcia z aparatu,
- wybieranie zdjęcia z galerii,
- podgląd szczegółów produktu,
- oznaczanie produktu jako kupiony,
- usuwanie produktu gestem swipe,
- filtrowanie produktów po sklepie,
- sortowanie produktów po cenie,
- statystyki produktów,
- pobieranie lokalizacji GPS,
- wibracje/haptic feedback przy akcjach użytkownika,
- zapis danych w AsyncStorage,
- działanie offline,
- obsługa błędów przez komunikaty Alert,
- Error Boundary dla błędów renderowania aplikacji.

## Ekrany aplikacji

Aplikacja składa się z następujących ekranów:

- `LoginScreen` – ekran logowania,
- `HomeScreen` – główna lista zakupów,
- `AddProductScreen` – formularz dodawania produktu,
- `ProductDetailsScreen` – szczegóły produktu,
- `SettingsScreen` – statystyki, lokalizacja i wylogowanie.

<img width="200" alt="Image (1)" src="https://github.com/user-attachments/assets/a248d8e7-7395-486c-9cf3-155e5e561dc0" />
<img width="200" alt="Image (2)" src="https://github.com/user-attachments/assets/4cba169c-af54-411a-a2b4-877d4bab57e9" />
<img width="200" alt="Image (3)" src="https://github.com/user-attachments/assets/478a3184-8627-419c-986d-723af026c5e1" />
<img width="200" alt="Image (4)" src="https://github.com/user-attachments/assets/bcff2003-b103-45db-992e-6442579b6edb" />
<img width="200" alt="Image (5)" src="https://github.com/user-attachments/assets/b072981a-d39f-4ffc-bb49-79594e9a5164" />

<img width="240" alt="MicrosoftTeams-video3-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/8571fa27-2ace-448b-b85c-4af7be28aa24" />

<img width="240" alt="MicrosoftTeams-video-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/e738f582-2f44-488a-85ad-9387de55eb5e" />
<img width="240" alt="MicrosoftTeams-video2-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/9353e9a5-63fd-4119-96d2-fd6005648af0" />


## Technologie

Projekt wykorzystuje:

- React Native,
- Expo,
- Expo Snack,
- React Navigation,
- Context API,
- AsyncStorage,
- Expo Image Picker,
- Expo Location,
- Expo Haptics,
- React Native Gesture Handler,
- Ionicons.

## Architektura aplikacji

W aplikacji zastosowano Context API do zarządzania globalnym stanem produktów. Dzięki temu lista produktów jest dostępna w wielu ekranach bez konieczności przekazywania danych przez wiele poziomów komponentów.

Stan globalny obejmuje:

- listę produktów,
- funkcję aktualizacji listy produktów,
- stan ładowania danych z pamięci lokalnej.

Stan lokalny pozostał w komponentach tam, gdzie dotyczy tylko jednego ekranu, np. wartości pól formularza, filtr wyszukiwania, sortowanie czy widoczność hasła.

Wybrano Context API, ponieważ aplikacja jest niewielka, a jej główny globalny stan dotyczy listy produktów. Rozwiązanie jest prostsze niż Redux i wystarczające dla tego typu projektu.

## Obsługa danych i tryb offline

Produkty są zapisywane w pamięci lokalnej urządzenia za pomocą AsyncStorage. Po ponownym uruchomieniu aplikacji dane są automatycznie wczytywane.

Dzięki temu aplikacja oferuje podstawowy tryb offline — użytkownik może przeglądać wcześniej zapisane produkty bez dostępu do internetu.

## Funkcje natywne urządzenia

Aplikacja wykorzystuje kilka funkcji natywnych:

### Kamera

Użytkownik może zrobić zdjęcie produktu podczas dodawania go do listy.

### Galeria zdjęć

Użytkownik może wybrać zdjęcie produktu z galerii telefonu.

### Lokalizacja GPS

Na ekranie ustawień można pobrać aktualną lokalizację użytkownika. Aplikacja obsługuje uprawnienia do lokalizacji oraz sytuację odmowy dostępu.

### Haptic Feedback

Aplikacja używa subtelnych wibracji przy wybranych akcjach, np. dodaniu, usunięciu lub zmianie statusu produktu.

## Obsługa asynchroniczności

W projekcie zastosowano operacje asynchroniczne z użyciem `async/await`.

Przykłady:

- zapis i odczyt danych z AsyncStorage,
- pobieranie lokalizacji GPS,
- obsługa uprawnień do aparatu, galerii i lokalizacji.

Aplikacja posiada komunikaty błędów oraz stan ładowania podczas wczytywania danych i pobierania lokalizacji.

## Nawigacja

Nawigacja została wykonana przy użyciu React Navigation i Stack Navigatora.

Aplikacja obsługuje:

- przejście z logowania do listy zakupów,
- przejście do formularza dodawania produktu,
- przejście do szczegółów produktu z przekazaniem parametrów,
- przejście do ustawień,
- powrót między ekranami,
- wylogowanie użytkownika.

Przekazywanie parametrów zostało wykorzystane przy przejściu z listy produktów do ekranu szczegółów produktu.

## UI/UX

Interfejs aplikacji został przygotowany z użyciem spójnych kolorów, zaokrąglonych kart, ikon oraz czytelnych przycisków.

Zastosowano:

- Flexbox,
- responsywny układ,
- czytelne pola formularza,
- komunikaty błędów,
- placeholdery,
- ukrywanie klawiatury po kliknięciu poza pole,
- podgląd hasła,
- potwierdzenie usunięcia produktu,
- gest swipe-to-delete.

## Theme / constants

W projekcie zastosowano własny plik `theme.js`, który przechowuje kolory, odstępy, promienie zaokrągleń i rozmiary tekstu.

Plik jest wykorzystywany m.in. w ekranach `HomeScreen` oraz `SettingsScreen`, co poprawia spójność interfejsu i ułatwia dalszą rozbudowę aplikacji.

## Wydajność

Do wyświetlania listy zastosowano `SectionList`, która jest odpowiednia do renderowania list podzielonych na sekcje. Produkty są podzielone na dwie grupy:

- Do kupienia,
- Kupione.

Dzięki temu aplikacja nie renderuje listy jako zwykłego `ScrollView`, tylko korzysta z komponentu przeznaczonego do wydajniejszej obsługi list.

## Obsługa błędów

Aplikacja obsługuje błędy i sytuacje wyjątkowe, m.in.:

- brak wymaganych pól formularza,
- niepoprawną cenę,
- odmowę uprawnień do aparatu,
- odmowę uprawnień do galerii,
- odmowę uprawnień do lokalizacji,
- błąd odczytu lub zapisu danych,
- brak produktu na ekranie szczegółów.

Komunikaty są wyświetlane użytkownikowi przy pomocy `Alert`.

Dodatkowo w projekcie dodano komponent `ErrorBoundary`, który przechwytuje błędy renderowania aplikacji i pokazuje użytkownikowi czytelny komunikat zamiast pustego lub czerwonego ekranu.

## Bezpieczeństwo

Aplikacja nie przechowuje danych wrażliwych ani kluczy API. Dane produktów są zapisywane lokalnie w AsyncStorage, ponieważ nie są to dane poufne.

Zastosowano podstawowe mechanizmy bezpieczeństwa:

- walidacja formularza,
- sprawdzanie poprawności ceny,
- brak kluczy API w kodzie,
- brak przesyłania danych do zewnętrznych serwerów,
- obsługa uprawnień użytkownika.

Dane logowania w projekcie mają charakter demonstracyjny i służą wyłącznie do pokazania działania ekranu logowania.

## Testy

W projekcie przygotowano plik testów jednostkowych dla najważniejszej logiki aplikacji.

Przykładowe scenariusze testowe:

1. Dodanie produktu do listy.
2. Usunięcie produktu z listy.
3. Zmiana statusu produktu na kupiony.
4. Filtrowanie produktów po sklepie.
5. Sortowanie produktów rosnąco po cenie.
6. Sortowanie produktów malejąco po cenie.
7. Walidacja pustej nazwy produktu.
8. Walidacja niepoprawnej ceny.
9. Odczyt danych z AsyncStorage.
10. Zapis danych do AsyncStorage.

Ze względu na realizację projektu w Expo Snack konfiguracja środowiska testowego jest ograniczona. Testy zostały przygotowane jako osobny plik z logiką możliwą do uruchomienia po przeniesieniu projektu do lokalnego środowiska Node.js z Jest.

## Jakość kodu

Kod został podzielony na ekrany, kontekst oraz funkcje pomocnicze. Zastosowano czytelne nazwy funkcji i zmiennych, oddzielenie logiki produktu od widoków oraz Context API do zarządzania stanem.

Ze względu na środowisko Expo Snack nie dodano pełnej konfiguracji ESLint i Prettier, ale kod został przygotowany zgodnie z konwencjami React Native i JavaScript.


## Instrukcja uruchomienia

### Uruchomienie w Expo Snack

1. Otwórz link do projektu w Expo Snack.
2. Kliknij `Run`.
3. Zeskanuj kod QR aplikacją Expo Go albo uruchom podgląd w przeglądarce.
4. Zaloguj się danymi:

   - login: `admin`,
   - hasło: `1234`.

### Uruchomienie lokalnie

Jeżeli projekt jest pobrany z GitHuba:

```bash
npm install
```

Następnie:

```bash
npx expo start
```

Aplikację można uruchomić w Expo Go przez zeskanowanie kodu QR.

## Wymagane zależności

```json
{
  "expo-haptics": "~15.0.8",
  "expo-location": "~19.0.8",
  "expo-image-picker": "~17.0.11",
  "@expo/vector-icons": "^15.0.3",
  "react-native-screens": "~4.16.0",
  "@react-navigation/native": "^7.1.18",
  "react-native-gesture-handler": "~2.28.0",
  "@react-navigation/native-stack": "^7.3.25",
  "react-native-safe-area-context": "~5.6.0",
  "@react-native-async-storage/async-storage": "2.2.0"
}
```
