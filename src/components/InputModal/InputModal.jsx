import { useState } from "react";
import Modal from "../modal/Modal";
import Tag from "../tag/Tag";
import Button from "../button/Button";
import classes from "./InputModal.module.css";
import uuid from "react-uuid";

let idNumber = 6;

// bugs to check:
// sometimes when changing the select drop downs you have to chose twice
// because it goes back to "none"(first and default value)
// the bug is only visual

// also need to check why not rerenders after posting

const InputModal = (props) => {
  // for now this list is local, later should get from user db
  const participantsNames = [
    "none@gmail.com",
    "velvel@gmail.com",
    "mike@gmail.com",
    "josh@gmail.com",
  ];

  const priorities = ["none", "epic", "high", "low"];

  const descValue = props.descValue === undefined ? "" : props.descValue;
  const assignee =
    props.userSelected === undefined
      ? participantsNames[0]
      : props.userSelected;
  const priorityState =
    props.prioritySelected === undefined
      ? priorities[0]
      : props.prioritySelected;

  const [descriptionVal, setDescriptionVal] = useState(descValue);
  const [email, setEmail] = useState(assignee);
  const [priority, setPriority] = useState(priorityState);
  const [status, setStatus] = useState(props.status);

  const onChangeDescHandler = (event) => {
    setDescriptionVal(event.target.value);
  };

  const onSelectEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const onSelectPriorityHandler = (event) => {
    setPriority(event.target.value);
  };
  const onSelectStatusHandler = (event) => {
    setStatus(event.target.value);
  };

  // check later
  const onSubmitingForm = (e) => {
    e.preventDefault();
    const task = {
      text: descriptionVal,
      email: email,
      priority: priority,
      task_id: props.task_id,
      project_id: 1,
      // uniqe_id: uuid(),
      status: !status ? "to do" : status,
    };
    props.onCreateIssue(task);
  };

  const onDeleteTask = (task) => {
    task = {
      text: descriptionVal,
      email: email,
      priority: priority,
      task_id: props.task_id,
      project_id: 1,
      status: !status ? "to do" : status,
    };
    props.delete(task);
  };

  const statusSelect =
    props.isEditMode === true ? (
      <select
        defaultValue={status}
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
    <Modal>
      <form onSubmit={onSubmitingForm} className={classes.form}>
        <div className={classes["input-box"]}>
          <label>Description</label>
          <input
            type="text"
            value={descriptionVal}
            placeholder={
              descriptionVal.length === 0 ? "Write a task" : descriptionVal
            }
            onChange={onChangeDescHandler}
          />
        </div>
        {/* ---------------------- */}
        <div className={classes.bottomHalf}>
          <Tag>{props.task_id}</Tag>
          {statusSelect}
          <div className={classes["drop-select"]}>
            <label>Assign to: </label>
            <select
              defaultValue={props.userSelected}
              name="assignee"
              onChange={onSelectEmailHandler}
            >
              {participantsNames.map((name) => {
                return (
                  <option key={Math.random()} value={name}>
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
              {priorities.map((priority) => {
                return (
                  <option key={Math.random()} value={priority}>
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
