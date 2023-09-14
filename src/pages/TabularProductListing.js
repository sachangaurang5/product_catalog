import React from "react";
import { Button, Table } from "react-bootstrap";

const TabularProductListing = ({
  addToCart,
  products,
  productsInventory,
  addToCompare,
}) => {
  const productData = products.map((singleProduct, index) => {
    return (
      <tr key={singleProduct.id}>
        <td>
          <img
            src={singleProduct.images[0]}
            alt="Product"
            style={{ width: "50px" }}
          ></img>
        </td>
        <td>{singleProduct.title}</td>
        <td>${singleProduct.price}</td>
        <td className="w-50">{singleProduct.description}</td>
        <td>
          <Button
            onClick={() =>
              addToCart(
                singleProduct.id,
                singleProduct.title,
                singleProduct.price,
                singleProduct.images[0]
              )
            }
          >
            Add To Cart
          </Button>
        </td>
        <td>
          <Button
            onClick={() => addToCompare(singleProduct.id)}
            variant="success"
          >
            Add To Compare
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{productData} </tbody>
      </Table>
    </>
  );
};

export default TabularProductListing;
