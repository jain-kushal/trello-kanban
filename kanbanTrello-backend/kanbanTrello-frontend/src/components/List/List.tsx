import React, { FunctionComponent } from "react";
import classes from "./List.module.css";
import TaskCard from "../Card/TaskCard";
import AddNewTaskCard from "../Card/AddNewCard/AddNewTaskCard";
import { Droppable } from "react-beautiful-dnd";

type ListProps = {
  title: string;
  cards: [];
  listID: string;
};

const list: FunctionComponent<ListProps> = ({ title, cards, listID }) => (
  <Droppable droppableId={listID}>
    {(provided) => (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        className={classes.List}
      >
        <h5 className={classes.ListTitle}>{title}</h5>
        {cards.map(
          (
            card: { _id: string; title: string; description: string },
            index
          ) => (
            <TaskCard
              key={card._id}
              index={index}
              cardID={card._id}
              title={card.title}
              description={card.description}
            />
          )
        )}

        {provided.placeholder}
        <AddNewTaskCard listID={listID} />
      </div>
    )}
  </Droppable>
);

export default list;
