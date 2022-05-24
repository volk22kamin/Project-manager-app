import { useState } from "react";
import Modal from "../modal/Modal";
import Tag from "../tag/Tag";
import Button from "../button/Button";
import classes from "./InputModal.module.css";

// bugs to check:
// when changing assignee it dosent change
// the bug is only visual(the db changes)

const InputModal = (props) => {
  const emails = props.usersList;
  const priorities = ["none", "epic", "high", "low"];

  let description = null;
  let assignee = null;
  let priority = null;

  if (props.isEditMode) {
    description = props.descValue;
    assignee = props.userSelected;
    priority = props.prioritySelected;
  } else {
    description = "";
    assignee = emails[0];
    priority = priorities[0];
  }

  const [descriptionState, setDescriptionState] = useState(description);
  const [assigneeState, setAssigneeState] = useState(assignee);
  const [priorityState, setPriorityState] = useState(priority);
  const [statusState, setStatusState] = useState(props.status);

  const onChangeDescHandler = (event) => {
    setDescriptionState(event.target.value);
  };

  const onSelectEmailHandler = (event) => {
    setAssigneeState(event.target.value);
  };
  const onSelectPriorityHandler = (event) => {
    setPriorityState(event.target.value);
  };
  const onSelectStatusHandler = (event) => {
    setStatusState(event.target.value);
  };

  const onSubmitingForm = (e) => {
    e.preventDefault();
    const task = {
      text: descriptionState,
      email: assigneeState,
      priority: priorityState,
      task_id: props.task_id,
      project_id: 1,
      status: statusState === undefined ? "to do" : statusState,
    };
    props.onCreateIssue(task);
  };

  const onDeleteTask = (task) => {
    task = {
      text: descriptionState,
      email: assigneeState,
      priority: priorityState,
      task_id: props.task_id,
      project_id: 1,
      status: !statusState ? "to do" : statusState,
    };
    props.delete(task);
  };

  const statusSelect = props.isEditMode ? (
    <select
      defaultValue={statusState}
      onChange={onSelectStatusHandler}
      className={classes["drop-select-status"]}
    >
      <option value="to do">to do</option>
      <option value="in progress">in progress</option>
      <option value="code review">code review</option>
      <option value="done">done</option>
    </select>
  ) : null;

  return (
    <Modal onClose={props.onCloseModal}>
      <form onSubmit={onSubmitingForm} className={classes.form}>
        <div className={classes["input-box"]}>
          <label>Description</label>
          <input
            type="text"
            value={descriptionState}
            placeholder={
              descriptionState.length === 0 ? "Write a task" : descriptionState
            }
            onChange={onChangeDescHandler}
          />
        </div>
        {/* ---------------------- */}
        <div className={classes.bottomHalf}>
          {/* <Tag>{props.task_id}</Tag> */}
          {statusSelect}
          <div className={classes["drop-select"]}>
            <label>Assign to: </label>
            <select
              defaultValue={props.userSelected}
              name="assignee"
              onChange={onSelectEmailHandler}
            >
              {emails.map((name, id) => {
                return (
                  <option key={id} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={classes["drop-select-priority"]}>
            <label>priority:</label>
            <select
              defaultValue={props.prioritySelected}
              name="priority"
              onChange={onSelectPriorityHandler}
            >
              {priorities.map((priority, id) => {
                return (
                  <option key={id} value={priority}>
                    {priority}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className={classes.btns}>
          <Button type="submit">{props.okBtn}</Button>
          {props.isEditMode ? (
            <Button onClick={onDeleteTask}>Delete</Button>
          ) : null}
          <Button onClick={props.onCloseModal}>Cancel</Button>
        </div>
        {/* ------------------------------- */}
      </form>
    </Modal>
  );
};

export default InputModal;
