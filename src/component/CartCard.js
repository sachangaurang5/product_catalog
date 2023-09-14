import React from "react";
import { Card, Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

const CartCard = ({ id, title, price, image, qty, removeFromCart }) => {
  return (
    <Card style={{ width: "10rem", marginTop: "5px", marginLeft: "5px" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body style={{ padding: "0" }}>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <Card.Body style={{ paddingLeft: "0" }}>
        ${price} x {qty}
        <Card.Link>
          <Button
            variant="link"
            style={{
              fontWeight: "bolder",
              color: "maroon",
              fontSize: "1.2rem",
              paddingTop: "0",
            }}
            onClick={() => removeFromCart(id)}
          >
            <MdDelete />
          </Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default CartCard;
