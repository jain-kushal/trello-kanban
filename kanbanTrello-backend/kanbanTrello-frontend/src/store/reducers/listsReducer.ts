import { CONSTANTS } from "../actions";

let initialState: any[] = [];

const listsReducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case CONSTANTS.GET_TASKLISTS: {
      const newArr = [];
      for (const el of action.payload) {
        newArr.push({
          listTitle: el.title,
          id: el._id,
          taskCards: [],
        });
      }
      const newState = [...state, ...newArr];
      return newState;
    }

    case CONSTANTS.GET_TASKCARDS: {
      const newState = [...state];
      for (const el of newState) {
        el.taskCards = action.payload[el.id] ? action.payload[el.id] : [];
      }
      return newState;
    }

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        title: action.payload.title,
        description: action.payload.description,
        _id: action.payload._id,
      };
      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            taskCards: [...list.taskCards, newCard],
          };
        } else return list;
      });
      return newState;
    }

    case CONSTANTS.DRAG_HAPPENDED: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
      } = action.payload;
      const newState = [...state];

      //Handle dragging in same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        if (list) {
          const card = list.taskCards.splice(droppableIndexStart, 1);
          // console.log(card);
          list.taskCards.splice(droppableIndexEnd, 0, ...card);
        }
      }

      //Handle dragging in other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list from which the card is being dragged
        const listBegin = state.find((list) => droppableIdStart === list.id);

        //find the list  where the card is being dragged to
        const listEnd = state.find((list) => droppableIdEnd === list.id);

        if (listBegin && listEnd) {
          // pull out the card from the list
          const card = listBegin.taskCards.splice(droppableIndexStart, 1);

          // put the card in the new List
          listEnd.taskCards.splice(droppableIndexEnd, 0, ...card);
        }
      }

      return newState;
    }

    case CONSTANTS.ERROR_HANDLER: {
      alert(action.payload);
      return;
    }

    default:
      return state;
  }
};

export default listsReducer;
