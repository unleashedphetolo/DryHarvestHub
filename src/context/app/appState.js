import React, { useReducer } from "react";
import AppContext from "./appContext";
import {
  ADD_PRODUCT,
  ADD_TO_CART,
  APP_ERROR,
  DECREMENT_QUANTITY,
  GET_ORDERS,
  GET_PRODUCER_PRODUCTS,
  GET_PRODUCTS,
  INCREMENT_QUANTITY,
  ORDER,
  ORDERS_LOADING,
  PRODUCTS_LOADING,
  REMOVE_CART_ITEM,
} from "../types";
import AppReducer from "./appReducer";
import { db } from "../../firebase/config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Orders from "../../screens/Orders";

const AppState = ({ children }) => {
  const initialState = {
    ordersLoading: false,
    products: [],
    producerProducts: [],
    productsLoading: false,
    cart: [],
    orders: [],
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const productsCollection = collection(db, "products");
  const ordersCollection = collection(db, "orders");
  const storage = getStorage();

  // get orders
  const getOrders = async (id) => {
    setOrdersLoading();
    try {
      const querySnapshot = await getDocs(
        query(ordersCollection, where("userId", "==", id))
      );
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      dispatch({ type: GET_ORDERS, payload: orders });
    } catch (error) {
      console.log("Err", error);
    }
  };
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

  const getProducerProducts = async (id) => {
    setProductsLoading();
    try {
      const querySnapshot = await getDocs(
        query(productsCollection, where("userId", "==", id))
      );
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      dispatch({ type: GET_PRODUCER_PRODUCTS, payload: products });
    } catch (error) {
      dispatch({ type: APP_ERROR, payload: error });
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

  const createProduct = async (product, navigation) => {
    setProductsLoading();
    try {
      const imageRef = ref(
        storage,
        "images/" + new Date().valueOf() + "_" + product.image.name
      );

      const imageSnapShot = await uploadBytes(imageRef, product.image.blob);
      const imageDownloadURL = await getDownloadURL(imageSnapShot.ref);

      const doc = await addDoc(productsCollection, {
        ...product,
        image: imageDownloadURL,
      });
      dispatch({
        type: ADD_PRODUCT,
        payload: {
          ...product,
          image: imageDownloadURL,
        },
      });
      navigation.navigate("Main");
    } catch (error) {
      console.log(error);
      dispatch({ type: APP_ERROR });
    }
  };
  // Set Loading
  const setProductsLoading = () => dispatch({ type: PRODUCTS_LOADING });
  const setOrdersLoading = () => dispatch({ type: ORDERS_LOADING });

  return (
    <AppContext.Provider
      value={{
        ordersLoading: state.ordersLoading,
        productsLoading: state.productsLoading,
        products: state.products,
        producerProducts: state.producerProducts,
        cart: state.cart,
        orders: state.orders,
        getProducts,
        addToCart,
        removeCartItem,
        incrementQuantity,
        decrementQuantity,
        order,
        createProduct,
        getProducerProducts,
        getOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
