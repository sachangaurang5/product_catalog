import React from "react";
import ProductsCard from "../component/ProductsCard";
import { Row } from "react-bootstrap";

const GridProductListing = ({
  addToCart,
  products,
  productsInventory,
  addToCompare,
}) => {
  const productData = products.map((singleProduct, index) => {
    return (
      <ProductsCard
        key={singleProduct.id}
        id={singleProduct.id}
        title={singleProduct.title}
        price={singleProduct.price}
        description={singleProduct.description}
        image={singleProduct.images[0]}
        addToCart={addToCart}
        productsInventory={productsInventory}
        addToCompare={addToCompare}
      />
    );
  });

  return <Row>{productData}</Row>;
};

export default GridProductListing;
