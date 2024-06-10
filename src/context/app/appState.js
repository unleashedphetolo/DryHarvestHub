import React, { useReducer } from "react";
import AppContext from "./appContext";
import {
  ADD_TO_CART,
  APP_ERROR,
  DECREMENT_QUANTITY,
  GET_PRODUCTS,
  INCREMENT_QUANTITY,
  ORDER,
  ORDERS_LOADING,
  PRODUCTS_LOADING,
  REMOVE_CART_ITEM,
} from "../types";
import AppReducer from "./appReducer";
import { db } from "../../firebase/config";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

const AppState = ({ children }) => {
  const initialState = {
    products: [],
    productsLoading: false,
    cart: [],
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const productsCollection = collection(db, "products");
  const ordersCollection = collection(db, "orders");

  // get products
  const getProducts = async () => {
    setProductsLoading();
    try {
      const q = query(productsCollection);
      const res = await getDocs(q);
      const products = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch({ type: GET_PRODUCTS, payload: products });
    } catch (error) {
      dispatch({ type: APP_ERROR });
      console.log(error);
    }
  };

  // Add to cart
  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const removeCartItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  const incrementQuantity = (id) => {
    dispatch({ type: INCREMENT_QUANTITY, payload: id });
  };
  const decrementQuantity = (id) => {
    dispatch({ type: DECREMENT_QUANTITY, payload: id });
  };

  const order = async (order, navigation) => {
    setOrdersLoading();
    try {
      const doc = await addDoc(ordersCollection, order);
      dispatch({ type: ORDER });
      navigation.navigate("Profile");
    } catch (error) {
      dispatch({ type: APP_ERROR });
    }
  };
  // Set Loading
  const setProductsLoading = () => dispatch({ type: PRODUCTS_LOADING });
  const setOrdersLoading = () => dispatch({ type: ORDERS_LOADING });

  return (
    <AppContext.Provider
      value={{
        productsLoading: state.productsLoading,
        products: state.products,
        cart: state.cart,
        getProducts,
        addToCart,
        removeCartItem,
        incrementQuantity,
        decrementQuantity,
        order,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
