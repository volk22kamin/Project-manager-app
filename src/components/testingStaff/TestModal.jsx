import { useState } from "react";
import Modal from "../modal/Modal";
import Tag from "../tag/Tag";
import Button from "../button/Button";
import classes from "./TestNodal.module.css";

let idNumber = 6;

const TestModal = (props) => {
  const participantsNames = [
    "none@gmail.com",
    "velvel@gmail.com",
    "mike@gmail.com",
    "josh@gmail.com",
  ];

  console.log("user selected", props.userSelected);

  const priorities = ["none", "epic", "high", "low"];

  const descValue = props.descValue === undefined ? "" : props.descValue;

  const [descriptionVal, setDescriptionVal] = useState(descValue);

  const onChangeDescHandler = (event) => {
    setDescriptionVal(event.target.value);
  };

  return (
    <Modal>
      <form className={classes.form}>
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
          <Tag>{props.task}</Tag>
          <div className={classes["drop-select"]}>
            <label>Assign to: </label>
            <select defaultValue={props.userSelected} name="assignee">
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
            <select defaultValue={props.prioritySelected} name="priority">
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
          <Button onClick={props.onCreateIssue} type="submit">
            {props.okBtn}
          </Button>
          <Button onClick={props.onCloseModal}>Cancel</Button>
        </div>
        {/* ------------------------------- */}
      </form>
    </Modal>
  );
};

export default TestModal;
