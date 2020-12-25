import React from "react";
import Navbar from "react-bootstrap/Navbar";
import classes from "./Navigationbar.module.css";

const navigationBar = () => {
  return (
    <div>
      <Navbar bg="info" variant="dark">
        <Navbar.Brand href="#home">
          <div className={classes.BrandName}>Kanban Board</div>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default navigationBar;
