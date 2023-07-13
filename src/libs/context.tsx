import { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  seatNumber: number[];  
}

interface CartContextValues {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  resetCart: () => void;
}

export const CartContext = createContext({} as CartContextValues);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // }, [cartItems]);

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
    const currentDate = new Date();
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + item.quantity,
        seatNumber: [...existingItem.seatNumber, ...item.seatNumber],
        date: currentDate,
      };
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.name === item.name ? updatedItem : cartItem
        )
      );
    } else {
      const newItem = {
        ...item,
        date: currentDate,
      };
      setCartItems((prevItems) => [...prevItems, newItem]);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

  };

  const resetCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartValues: CartContextValues = {
    cartItems,
    totalQuantity,
    totalPrice,
    addToCart,
    resetCart,
  };

  return (
    <CartContext.Provider value={cartValues}>
      {children}
    </CartContext.Provider>
  );
};

