import React from "react";
import { Container, Offcanvas, Row } from "react-bootstrap";
import CartCard from "../component/CartCard";

const CartCanvas = ({
  cart,
  showCanvas,
  handleCanvasClose,
  removeFromCart,
}) => {
  const cartData = cart.map((singleCartItem) => {
    return (
      <CartCard
        key={singleCartItem.id}
        id={singleCartItem.id}
        title={singleCartItem.title}
        price={singleCartItem.price}
        image={singleCartItem.image}
        qty={singleCartItem.qty}
        removeFromCart={removeFromCart}
      />
    );
  });

  const totalPrice = cart.reduce((acc, cur) => {
    return acc + cur.price * cur.qty;
  }, 0);

  return (
    <>
      <Offcanvas
        show={showCanvas}
        onHide={handleCanvasClose}
        scroll
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {cart.length > 0
              ? `${cart.length} Items in Your Cart`
              : `No Items in Your Cart`}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Header>
          <Offcanvas.Title>Total: ${totalPrice}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Row>{cartData}</Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CartCanvas;
