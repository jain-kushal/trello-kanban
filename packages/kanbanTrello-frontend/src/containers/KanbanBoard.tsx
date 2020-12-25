import React, { Component } from "react";
import List from "../components/List/List";
import classes from "./KanbanBoard.module.css";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { getTaskCards, sort } from "../store/actions/cardsActions";
import { getTaskLists } from "../store/actions/listsActions";

interface StateProps {
  lists: [];
  getTaskLists?: any;
  getTaskCards?: any;
  sort?: any;
}

class KanbanBoard extends Component<StateProps> {
  async componentDidMount() {
    try {
      await this.props.getTaskLists();
      await this.props.getTaskCards();
    } catch (err) {
      console.log(err);
    }
  }
  onDragEnd = (result: any) => {
    const {
      destination,
      source,
      draggableId,
    }: { destination: any; source: any; draggableId: any } = result;

    if (!destination) {
      return;
    }

    this.props.sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    );
  };

  render() {
    let { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={classes.KanbanBoard}>
          {lists.map(
            (list: { id: string; listTitle: string; taskCards: [] }) => (
              <List
                key={list.id}
                listID={list.id}
                title={list.listTitle}
                cards={list.taskCards}
              />
            )
          )}
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state: { taskLists: [] }) => ({
  lists: state.taskLists,
});

export default connect(mapStateToProps, { getTaskLists, getTaskCards, sort })(
  KanbanBoard
);
