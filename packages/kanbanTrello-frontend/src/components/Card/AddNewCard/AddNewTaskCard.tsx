import React, { Component } from "react";
import { connect } from "react-redux";
import { addCard } from "../../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../UI/Button/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

type AddNewTaskCardProps = {
  listID: string;
  dispatch?: any;
};

class AddNewTaskCard extends Component<AddNewTaskCardProps> {
  state = {
    isFormOpen: false,
    formData: {
      title: "",
      description: "",
    },
  };

  // To handle closing and opening of form
  onClickHandler = () => {
    this.setState({
      ...this.state,
      isFormOpen: !this.state.isFormOpen,
    });
  };

  // Handling onchange form input event
  onChangeHandler = (evt: { target: { value: string; name: string } }) => {
    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        [evt.target.name]: evt.target.value,
      },
    });
  };

  // handling form submit event
  onTaskSubmitHandler = () => {
    const { dispatch } = this.props;
    const { formData } = this.state;
    if (formData) {
      dispatch(addCard(formData, this.props.listID));
    }
    this.setState({
      ...this.state,
      isFormOpen: false,
      formData: {
        title: "",
        description: "",
      },
    });
    return;
  };

  render() {
    return (
      <div>
        {this.state.isFormOpen ? (
          <Card style={{ borderRadius: 5, padding: "10px" }}>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={this.onClickHandler}
              style={{ cursor: "pointer", color: "#5bc0de" }}
            />
            <Form style={{ margin: "0px" }} onSubmit={this.onTaskSubmitHandler}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter task title"
                  value={this.state.formData.title}
                  onChange={this.onChangeHandler}
                  autoFocus
                  required
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  placeholder="Enter task description"
                  value={this.state.formData.description}
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
              <Button btnType="submit">Add</Button>
            </Form>
          </Card>
        ) : (
          <Button clicked={this.onClickHandler}>Add New Task</Button>
        )}
      </div>
    );
  }
}

export default connect()(AddNewTaskCard);
