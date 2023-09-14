import React from "react";
import { Container, Offcanvas, Row } from "react-bootstrap";
import ComparisonCard from "../component/ComparisonCard";

const CompareCanvas = ({
  products,
  compare,
  showCompareCanvas,
  handleCompareCanvasClose,
  removeFromCompare,
}) => {
  const compareData = compare.map((singleCompareItem) => {
    const singleProductIndex = products.findIndex(
      (singleItem) => singleItem.id === singleCompareItem
    );

    const singleProduct = products[singleProductIndex];

    // console.log(singleProduct);

    return (
      <ComparisonCard
        key={singleProduct.id}
        id={singleProduct.id}
        title={singleProduct.title}
        description={singleProduct.description}
        price={singleProduct.price}
        image={singleProduct.images[0]}
        removeFromCompare={removeFromCompare}
      />
    );
  });

  return (
    <>
      <Offcanvas
        show={showCompareCanvas}
        onHide={handleCompareCanvasClose}
        scroll
        placement="top"
        className="h-auto"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {compare.length > 0
              ? `${compare.length} Items to compare.`
              : `No Items in Compare`}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Row>{compareData}</Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CompareCanvas;
