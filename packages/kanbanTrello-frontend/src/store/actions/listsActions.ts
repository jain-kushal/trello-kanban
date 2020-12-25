import axios from "axios";
import { CONSTANTS } from ".";

// GET ALL THE TASKLISTS
export const getTaskLists = () => (dispatch: any) => {
  axios
    .get("http://localhost:4000/api/taskcategory")
    .then((res) => {
      // This [then] needs to be executed first time when there is no TaskCategory in existence. Can be avoided when we add a new List button
      if (res.data.length === 0) {
        for (const el of ["In Progress", "Ready", "In QA", "Complete"]) {
          postTaskLists(dispatch, { title: el });
        }
      }
      return res;
    })
    .then((res) => {
      dispatch({
        type: CONSTANTS.GET_TASKLISTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CONSTANTS.ERROR_HANDLER,
        payload: "Something went wrong while getting task lists!",
      });
    });
};

// ADD NEW TASKLISTS
export const postTaskLists = (
  dispatch: any,
  taskcategory: { title: string }
) => {
  axios
    .post("http://localhost:4000/api/taskcategory", {
      title: taskcategory.title,
    })
    .then((res) => {
      dispatch({
        type: CONSTANTS.POST_TASKLISTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CONSTANTS.ERROR_HANDLER,
        payload: "Something went wrong while adding new task list!",
      });
    });
  getTaskLists();
};
