export const addItem = (item, next) => {
  let cart = [];
  if(typeof window !== 'undefined') {
    // access local storage
    if(localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.push({
      ...item,
      count: 1
    })

    // get the cart and create new array, Set will remove duplicate ids
    cart = Array.from(new Set(cart.map(product => product._id))).map(id => {
      return cart.find(product => product._id === id);
    })

    // Set cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};

export const getItemTotal = () => {
  if (typeof window !== 'undefined') {
    if(localStorage.getItem('cart'))
      return JSON.parse(localStorage.getItem('cart')).length
  }
  return 0;
};

export const getCart = () => {
  if (typeof window !== 'undefined') {
    if(localStorage.getItem('cart'))
      return JSON.parse(localStorage.getItem('cart'));
  }
  return [];
};

export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    // access local storage
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, i) => {
      if(product._id === productId) {
        cart[i].count = count
      }
    })

    localStorage.setItem('cart', JSON.stringify(cart));
  }
}