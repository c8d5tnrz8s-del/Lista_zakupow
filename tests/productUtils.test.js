import {
  validateProduct,
  parsePrice,
  addProductToList,
  deleteProductFromList,
  toggleProductBought,
  filterProducts,
  sortProductsByPrice,
  countBoughtProducts,
  countNotBoughtProducts
} from '../utils/productUtils';

const products = [
  {
    id: '1',
    name: 'Mleko',
    price: 4.99,
    shop: 'Biedronka',
    bought: false
  },
  {
    id: '2',
    name: 'Chleb',
    price: 3.5,
    shop: 'Lidl',
    bought: true
  },
  {
    id: '3',
    name: 'Masło',
    price: 8.99,
    shop: 'Biedronka',
    bought: false
  }
];

test('walidacja zwraca błąd, gdy nazwa jest pusta', () => {
  const result = validateProduct({
    name: '',
    price: '10',
    shop: 'Lidl'
  });

  expect(result).toBe('Nazwa produktu jest wymagana.');
});

test('walidacja zwraca błąd, gdy cena jest pusta', () => {
  const result = validateProduct({
    name: 'Mleko',
    price: '',
    shop: 'Lidl'
  });

  expect(result).toBe('Cena jest wymagana.');
});

test('walidacja zwraca błąd, gdy sklep jest pusty', () => {
  const result = validateProduct({
    name: 'Mleko',
    price: '10',
    shop: ''
  });

  expect(result).toBe('Sklep jest wymagany.');
});

test('walidacja akceptuje poprawny produkt', () => {
  const result = validateProduct({
    name: 'Mleko',
    price: '4,99',
    shop: 'Biedronka'
  });

  expect(result).toBeNull();
});

test('parsePrice zamienia przecinek na poprawną liczbę', () => {
  expect(parsePrice('9,99')).toBe(9.99);
});

test('dodanie produktu dodaje go na początek listy', () => {
  const newProduct = {
    id: '4',
    name: 'Ser',
    price: 7,
    shop: 'Lidl',
    bought: false
  };

  const result = addProductToList(products, newProduct);

  expect(result[0].name).toBe('Ser');
  expect(result.length).toBe(4);
});

test('usunięcie produktu usuwa element o podanym id', () => {
  const result = deleteProductFromList(products, '2');

  expect(result.length).toBe(2);
  expect(result.find(product => product.id === '2')).toBeUndefined();
});

test('toggleProductBought zmienia status produktu', () => {
  const result = toggleProductBought(products, '1');

  expect(result[0].bought).toBe(true);
});

test('filterProducts filtruje produkty po sklepie', () => {
  const result = filterProducts(products, 'biedronka');

  expect(result.length).toBe(2);
});

test('sortProductsByPrice sortuje produkty rosnąco', () => {
  const result = sortProductsByPrice(products, true);

  expect(result[0].name).toBe('Chleb');
});

test('sortProductsByPrice sortuje produkty malejąco', () => {
  const result = sortProductsByPrice(products, false);

  expect(result[0].name).toBe('Masło');
});

test('countBoughtProducts liczy kupione produkty', () => {
  expect(countBoughtProducts(products)).toBe(1);
});

test('countNotBoughtProducts liczy produkty do kupienia', () => {
  expect(countNotBoughtProducts(products)).toBe(2);
});