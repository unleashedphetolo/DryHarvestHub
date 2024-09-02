import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import AppContext from "../context/app/appContext";
import Loading from "../components/Loading";
import { Modal } from "react-native";

const categories = [
  { id: 1, name: "All" },
  { id: 2, name: "Fruits" },
  { id: 3, name: "Vegetables" },
];

const Home = ({ navigation }) => {
  const { getProducts, productsLoading, products } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const inCategory =
      selectedCategory === "All" ||
      (selectedCategory?.toLowerCase() === "fruits" &&
        product?.category?.toLowerCase() === "fruits") ||
      (selectedCategory?.toLowerCase() === "vegetables" &&
        product?.category?.toLowerCase() === "vegetables");
    return (
      inCategory &&
      product?.title?.toLowerCase()?.includes(searchText.toLowerCase())
    );
  });

  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    toggleFilterModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DryHarvestHub</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="cart" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 20,
        }}
      >
        <View
          style={{
            borderRadius: 14,
            borderWidth: 2,
            borderColor: "#ECECEC",
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F5F5F5",
            marginRight: 5,
            padding: 5,
          }}
        >
          <Octicons name="search" size={22} color="grey" />
          <TextInput
            style={{
              fontSize: 15,
              fontWeight: "bold",
              flex: 1,
              padding: 5,
            }}
            placeholderTextColor="grey"
            placeholder="Search"
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        <TouchableOpacity onPress={toggleFilterModal}>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.recommendationsHeader}>
        <Text style={styles.recommendationsText}>Recommendations</Text>
        <TouchableOpacity onPress={()=>setSelectedCategory("All")}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 10 }}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedCategory(item.name)}>
              <View
                style={[
                  styles.categoryItem,
                  selectedCategory === item.name && styles.categoryItemSelected,
                ]}
              >
                <Text style={styles.categoryItemText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          ItemSeparatorComponent={<View style={{ padding: 5 }} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.productList}>
        {productsLoading ? (
          <Loading />
        ) : filteredProducts.length === 0 ? (
          <Text style={styles.noProductsText}>No products found</Text>
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => (
              <View style={styles.productItem} key={item.id}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductDetails", { product: item })
                  }
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                  />
                  <View>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productPrice}>R {item.price}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
          />
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={toggleFilterModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <View style={styles.modalButtons}>
              <Button
                title="All"
                onPress={() => handleCategorySelect("All")}
                color={selectedCategory === "All" ? "green" : "grey"}
              />
              <Button
                title="Fruits"
                onPress={() => handleCategorySelect("Fruits")}
                color={selectedCategory === "Fruits" ? "green" : "grey"}
              />
              <Button
                title="Vegetables"
                onPress={() => handleCategorySelect("Vegetables")}
                color={selectedCategory === "Vegetables" ? "green" : "grey"}
              />
              <Button title="Close" onPress={toggleFilterModal} color="grey" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    padding: 20,
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "green",
    fontSize: 20,
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#ECECEC",
    backgroundColor: "#F5F5F5",
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
    flex: 1,
  },
  recommendationsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  recommendationsText: {
    color: "black",
    fontWeight: "500",
    fontSize: 15,
  },
  seeAllText: {
    color: "green",
    fontWeight: "500",
    fontSize: 15,
  },
  categoryItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  categoryItemSelected: {
    backgroundColor: "#aaa",
  },
  categoryItemText: {
    fontWeight: "bold",
  },
  productList: {
    flex: 1,
  },
  productRow: {
    justifyContent: "space-between",
  },
  productItem: {
    width: "45%",
    margin: 7,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  productTitle: {
    color: "black",
    fontWeight: "700",
    marginTop: 5,
  },
  productPrice: {
    color: "black",
  },
  noProductsText: {
    textAlign: "center",
    marginTop: 20,
    color: "grey",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default Home;
