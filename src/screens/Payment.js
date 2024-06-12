import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { WebView } from "react-native-webview";
import AuthContext from "../context/auth/authContext";
import AppContext from "../context/app/appContext";

const Payment = ({navigation}) => {
  const { order,cart } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  console.log(cart);
  const [data] = useState({
    merchant_id: "10000100",
    merchant_key: "46f0cd694581a",
    return_url: "https://payfast.io#success",
    cancel_url: "https://payfast.io#cancel",
    notify_url: "https://payfast.io/",
    m_payment_id: "1234",
    amount:cart
        .reduce(
          (total, { price, quantity }) => (total += price * quantity),
          0
        )
        .toFixed(2),
    item_name: "Dry Food",
    item_description: "A taste you'll remember.",
    name_first: user.name,
    name_last:"",
    email_address: user.email,
    cell_number: "0760448944",
    passphrase: "jt7NOE43FZPn",
  });
  const [paystate, setPaystate] = useState(true);

  const handleOrder = () => {
    const orderItem = {
      items: cart,
      name: user.name,
      email: user.email,
      userId: user.id,
    };

    order(orderItem, navigation);
  };

  return (
    <>
      {paystate ? (
        <WebView
          scalesPageToFit
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "white",
            zIndex: 1,
          }}
          source={{
            uri: "https://sandbox.payfast.co.za/eng/process",
            body: `merchant_id=${data.merchant_id}&merchant_key=${data.merchant_key}&return_url=${data.return_url}&cancel_url=${data.cancel_url}&notify_url=${data.notify_url}&m_payment_id=${data.m_payment_id}&amount=${data.amount}&item_name=${data.item_name}&item_description=${data.item_description}&name_first=${data.name_first}&name_last=${data.name_last}&email_address=${data.email_address}&cell_number=${data.cell_number}&passphrase=${data.passphrase}`,
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }}
          onNavigationStateChange={(event) => {
            if (event.url.includes("finish")) {
              console.log(event.url.split("/").pop() || "");
            } else if (event.url.includes("#success")) {
              if (paystate) {
                setPaystate(false);
                console.log("payment was succesful");
                handleOrder()
              }
              // Payment is a success, Make an order here
            } else if (event.url.includes("#cancel")) {
              setPaystate(false);
              console.log("Payment cancelled");
            }
          }}
          onError={() => {
            setPaystate(false);
            console.log("error");
          }}
          onHttpError={() => {
            setPaystate(false);
            console.log("error");
          }}
        />
      ) : null}
    </>
  );
};

export default Payment;
const styles = StyleSheet.create({
  webView: {
    flex: 1,
    backgroundColor: "white",
    zIndex: 1,
  },
});
