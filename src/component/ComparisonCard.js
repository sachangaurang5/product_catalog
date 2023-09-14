import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

const ComparisonCard = ({
  id,
  title,
  description,
  price,
  image,
  removeFromCompare,
}) => {
  return (
    <Card style={{ width: "18rem", marginTop: "5px", marginLeft: "5px" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Feature#1</ListGroup.Item>
        <ListGroup.Item>Feature#2</ListGroup.Item>
        <ListGroup.Item>Feature#3</ListGroup.Item>
        <ListGroup.Item>Feature#4</ListGroup.Item>
        <ListGroup.Item>Feature#5</ListGroup.Item>
      </ListGroup>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>${price}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link>
          <Button onClick={() => removeFromCompare(id)} variant="danger">
            Remove From Compare
          </Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ComparisonCard;
