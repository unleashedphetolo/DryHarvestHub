import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { WebView } from "react-native-webview";
import AuthContext from "../context/auth/authContext";
import AppContext from "../context/app/appContext";

const Payment = ({ navigation, route }) => {
  const { order, cart } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const { isDelivery } = route.params;
  const [amount] = useState(
    Number(
      cart
        .reduce((total, { price, quantity }) => (total += price * quantity), 0)
        .toFixed(2)
    ) + (isDelivery ? 150 : 0)
  );
  console.log("====================================");
  console.log(amount);
  console.log("====================================");

  console.log(cart);
  const [data] = useState({
    merchant_id: "11467929",
    merchant_key: "1so4eyhpghhi7",
    return_url: "http://hmpengineering.co.za/done",
    cancel_url: "http://hmpengineering.co.za/fail",
    notify_url: "http://hmpengineering.co.za/",
    m_payment_id: Math.random(),
    amount,
    item_name: "Dry Food",
    item_description: "A taste you'll remember.",
    name_first: user.name,
    name_last: "",
    email_address: user.email,
    cell_number: "0760448944",
    passphrase: "HmpEngineeringSolutions2023",
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
            uri: "https://www.payfast.co.za/eng/process",
            body: `merchant_id=${data.merchant_id}&merchant_key=${data.merchant_key}&return_url=${data.return_url}&cancel_url=${data.cancel_url}&notify_url=${data.notify_url}&m_payment_id=${data.m_payment_id}&amount=${data.amount}&item_name=${data.item_name}&item_description=${data.item_description}&name_first=${data.name_first}&name_last=${data.name_last}&email_address=${data.email_address}&cell_number=${data.cell_number}&passphrase=${data.passphrase}`,
            method: "POST",
            // headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }}
          onNavigationStateChange={(event) => {
            if (event.url.includes("finish")) {
              console.log(event.url.split("/").pop() || "");
            } else if (event.url.includes("#success")) {
              if (paystate) {
                setPaystate(false);
                console.log("payment was succesful");
                handleOrder();
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
