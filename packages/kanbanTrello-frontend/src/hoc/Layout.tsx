import React, { Fragment } from "react";
import Navigationbar from "../components/Navigation/Navigationbar";
import KanbanBoard from "../containers/KanbanBoard";

const Layout = () => (
  <Fragment>
    <Navigationbar />
    <KanbanBoard />
  </Fragment>
);

export default Layout;
