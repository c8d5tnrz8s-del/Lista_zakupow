export const validateProduct = ({ name, price, shop }) => {
  if (!name || !name.trim()) {
    return 'Nazwa produktu jest wymagana.';
  }

  if (!price || !price.trim()) {
    return 'Cena jest wymagana.';
  }

  if (!shop || !shop.trim()) {
    return 'Sklep jest wymagany.';
  }

  const parsedPrice = parseFloat(price.replace(',', '.'));

  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    return 'Cena musi być liczbą większą od 0.';
  }

  return null;
};

export const parsePrice = (price) => {
  return parseFloat(price.replace(',', '.'));
};

export const addProductToList = (products, product) => {
  return [product, ...products];
};

export const deleteProductFromList = (products, id) => {
  return products.filter(product => product.id !== id);
};

export const toggleProductBought = (products, id) => {
  return products.map(product =>
    product.id === id
      ? { ...product, bought: !product.bought }
      : product
  );
};

export const filterProducts = (products, text) => {
  return products.filter(product =>
    (product.shop || '')
      .toLowerCase()
      .includes(text.toLowerCase())
  );
};

export const sortProductsByPrice = (products, sortAsc = true) => {
  return [...products].sort((a, b) =>
    sortAsc
      ? a.price - b.price
      : b.price - a.price
  );
};

export const countBoughtProducts = (products) => {
  return products.filter(product => product.bought).length;
};

export const countNotBoughtProducts = (products) => {
  return products.filter(product => !product.bought).length;
};