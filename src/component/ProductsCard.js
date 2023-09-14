import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

const ProductsCard = ({
  id,
  title,
  description,
  price,
  image,
  addToCart,
  productsInventory,
  addToCompare,
}) => {
  const [lessItems, setlessItems] = useState(0);

  useEffect(() => {
    let less_items_available;
    const inventoryIndex = productsInventory.findIndex(
      (singleProduct) => singleProduct.id === id
    );

    if (inventoryIndex >= 0) {
      less_items_available = productsInventory[inventoryIndex].available_items;
      if (less_items_available >= 3) {
        setlessItems(0);
      } else {
        setlessItems(less_items_available);
      }
    }
  }, []);

  return (
    <Card style={{ width: "20rem", marginTop: "5px", marginLeft: "5px" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        {lessItems > 0 && (
          <Card.Text className="text-danger">
            Hurry! Only {lessItems} left in stock
          </Card.Text>
        )}
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>${price}</ListGroup.Item>
      </ListGroup>
      <Card.Body style={{ paddingLeft: "0" }}>
        <Card.Link>
          <Button onClick={() => addToCart(id, title, price, image)}>
            Add To Cart
          </Button>
        </Card.Link>
        <Card.Link>
          <Button onClick={() => addToCompare(id)} variant="success">
            Add to Compare
          </Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ProductsCard;
