import axios from "axios";
import { CONSTANTS } from ".";

// GET ALL THE CARDS
export const getTaskCards = () => (dispatch: any) => {
  axios
    .get("http://localhost:4000/api/taskcard")
    .then((res) =>
      dispatch({
        type: CONSTANTS.GET_TASKCARDS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: CONSTANTS.ERROR_HANDLER,
        payload: "Something went wrong while getting task cards!",
      });
    });
};

// ADD NEW CARD
export const addCard = (
  {
    title,
    description,
  }: {
    title: string;
    description: string;
  },
  listID: string
) => (dispatch: any) => {
  axios
    .post("http://localhost:4000/api/taskcard", {
      title: title,
      description: description,
      listID: listID,
    })
    .then((res) => {
      dispatch({
        type: CONSTANTS.ADD_CARD,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CONSTANTS.ERROR_HANDLER,
        payload: "Something went wrong while adding new task card!",
      });
    });
};

// UPDATE CARD (STATUS ONLY)
export const sort = (
  droppableIdStart: any,
  droppableIdEnd: any,
  droppableIndexStart: number,
  droppableIndexEnd: number,
  draggableId: any
) => (dispatch: any) => {
  axios
    .put(`http://localhost:4000/api/taskcard/${draggableId}`, {
      listID: droppableIdEnd,
    })
    .then((res) => {
      dispatch({
        type: CONSTANTS.DRAG_HAPPENDED,
        payload: {
          droppableIdStart,
          droppableIdEnd,
          droppableIndexStart,
          droppableIndexEnd,
          draggableId,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: CONSTANTS.ERROR_HANDLER,
        payload: "Something went wrong while updating task card!",
      });
    });
};
