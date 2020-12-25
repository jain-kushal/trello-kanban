import React, { FunctionComponent } from "react";
import Card from "react-bootstrap/Card";
import classes from "./TaskCard.module.css";
import { Draggable } from "react-beautiful-dnd";

type TaskCardProps = {
  cardID: string;
  title: string;
  description: string;
  index: number;
};

const taskCard: FunctionComponent<TaskCardProps> = ({
  cardID,
  title,
  description,
  index,
}) => {
  return (
    <Draggable draggableId={cardID} index={index}>
      {(provided) => (
        <div
          className={classes.Card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card style={{ borderRadius: 5 }}>
            <Card.Body>
              <Card.Title style={{ fontSize: "1.25em" }}>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default taskCard;
