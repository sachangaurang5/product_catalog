import React, { useEffect, useState } from "react";
import NavigationBar from "./component/NavigationBar";
import TabularProductListing from "./pages/TabularProductListing";
import GridProductListing from "./pages/GridProductListing";
import products from "./data/products.json";
import productsInventory from "./data/products_inventory.json";
import CartCanvas from "./pages/CartCanvas";
import { Alert } from "react-bootstrap";
import CompareCanvas from "./pages/CompareCanvas";

const GRID_VIEW_STORAGE_STRING = "isGridView";
const CART_STORAGE_STRING = "cart";

const App = () => {
  const [currentView, setCurrentView] = useState("tabular");
  const [showCanvas, setShowCanvas] = useState(false);
  const [showCompareCanvas, setshowCompareCanvas] = useState(false);
  const [cart, setCart] = useState([]);
  const [compare, setcompare] = useState([]);
  const [cartItems, setCartItems] = useState(0);
  const [compareItems, setCompareItems] = useState(0);
  const [alertVariant, setalertVariant] = useState("");
  const [alertMessage, setalertMessage] = useState("");

  useEffect(() => {
    const savedView = localStorage.getItem(GRID_VIEW_STORAGE_STRING);
    setCurrentView(savedView);
    const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_STRING));
    setCart(savedCart);
    setCartItems(savedCart.length);
  }, []);

  const handleToggleView = () => {
    let newView = "tabular";
    if (currentView === "tabular") {
      newView = "grid";
    }

    setCurrentView(newView);
    localStorage.setItem(GRID_VIEW_STORAGE_STRING, newView);
  };

  const addToCart = (productId, productTitle, productPrice, productImage) => {
    const existingCartIndex = cart.findIndex(
      (singleItem) => singleItem.id === productId
    );

    let newCart;

    const existingProductIndex = products.findIndex(
      (singleItem) => singleItem.id === productId
    );

    const limit_order = products[existingProductIndex].limitPerOrder;

    const existingProductInventoryIndex = productsInventory.findIndex(
      (singleItem) => singleItem.id === productId
    );

    const available_items =
      productsInventory[existingProductInventoryIndex].available_items;

    if (existingCartIndex >= 0) {
      newCart = cart;

      if (limit_order && newCart[existingCartIndex].qty + 1 > limit_order) {
        showAlert(
          "warning",
          `You cannot order more than ${limit_order} item per order.`
        );
        return;
      }

      if (
        available_items &&
        newCart[existingCartIndex].qty + 1 > available_items
      ) {
        showAlert("warning", "You cannot add it to Cart as it is stocked out.");
        return;
      }

      newCart[existingCartIndex].qty = newCart[existingCartIndex].qty + 1;
      setCart(newCart);
    } else {
      newCart = [
        ...cart,
        {
          id: productId,
          title: productTitle,
          price: productPrice,
          image: productImage,
          qty: 1,
        },
      ];

      setCart(newCart);
      setCartItems(newCart.length);
    }

    showAlert("success", "Added to Cart Successfully.");
    localStorage.setItem(CART_STORAGE_STRING, JSON.stringify(newCart));

    // console.log(newCart, JSON.stringify(newCart));
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter((singleItem) => singleItem.id !== productId);
    setCart(newCart);
    setCartItems(newCart.length);
    // console.log("Removed From Cart Successfully.");
    showAlert("success", "Removed From Cart Successfully.");

    localStorage.setItem(CART_STORAGE_STRING, JSON.stringify(newCart));
  };

  const handleCanvasClose = () => {
    setShowCanvas(false);
  };
  const handleCanvasShow = () => {
    setShowCanvas(true);
  };

  const handleCompareCanvasClose = () => {
    setshowCompareCanvas(false);
  };
  const handleCompareCanvasShow = () => {
    setshowCompareCanvas(true);
  };

  const showAlert = (variant, message) => {
    setalertMessage(message);
    setalertVariant(variant);
  };

  const addToCompare = (productId) => {
    const existingCompareIndex = compare.findIndex(
      (singleItem) => singleItem === productId
    );

    if (existingCompareIndex >= 0) {
      showAlert(
        "warning",
        "You cannot add it to Compare as it is already in the compare."
      );

      return;
    }

    if (compare.length >= 3) {
      showAlert("warning", "You cannot add more than 3 items to compare.");

      return;
    }

    const newCompare = compare;

    newCompare.push(productId);
    setCompareItems(newCompare.length);
    setcompare(newCompare);
  };

  const removeFromCompare = (productId) => {
    const newCompare = compare.filter(
      (singleCompare) => singleCompare != productId
    );

    setCompareItems(newCompare.length);
    setcompare(newCompare);
  };

  return (
    <>
      <NavigationBar
        currentView={currentView}
        handleToggleView={handleToggleView}
        handleCanvasShow={handleCanvasShow}
        handleCompareCanvasShow={handleCompareCanvasShow}
        cartItems={cartItems}
        compareItems={compareItems}
      />
      {alertMessage && (
        <Alert
          variant={alertVariant}
          dismissible
          onClose={() => setalertMessage(null)}
        >
          {alertMessage}
        </Alert>
      )}
      <CompareCanvas
        products={products}
        compare={compare}
        showCompareCanvas={showCompareCanvas}
        handleCompareCanvasClose={handleCompareCanvasClose}
        removeFromCompare={removeFromCompare}
      />
      <CartCanvas
        showCanvas={showCanvas}
        handleCanvasClose={handleCanvasClose}
        cart={cart}
        removeFromCart={removeFromCart}
      />
      {currentView === "tabular" && (
        <TabularProductListing
          products={products}
          productsInventory={productsInventory}
          addToCart={addToCart}
          addToCompare={addToCompare}
        />
      )}
      {currentView !== "tabular" && (
        <GridProductListing
          products={products}
          productsInventory={productsInventory}
          addToCart={addToCart}
          addToCompare={addToCompare}
        />
      )}
    </>
  );
};

//offcanvas for showing the cart.

export default App;
