import { useRef } from "react";

import classes from "./CreateIssue.module.css";
import Modal from "../modal/Modal";
import Tag from "../tag/Tag";
import Button from "../button/Button";

// for now starts with 5 becouse theres 4 dummy issues
let idNumber = 4;

// gets props from projectOverview
// for now the id is local have to check if it wont restart every load
const CreateIssue = (props) => {
  const participantsNames = ["none", "velvel", "mike", "josh"];
  const priorities = ["none", "epic", "high", "low"];

  const descriptionRef = useRef();
  const assigneeRef = useRef();
  const priortyRef = useRef();
  const taskInput_obj = {
    description: "",
    assignee: "",
    priorty: "",
    id: idNumber + 1,
  };

  const onCloseModalHandler = () => {
    props.onCloseModal();
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    idNumber++;
    taskInput_obj.description = descriptionRef.current.value;
    taskInput_obj.assignee = assigneeRef.current.value;
    taskInput_obj.priorty = priortyRef.current.value;

    props.onCreateIssue(taskInput_obj);
    props.onCloseModal();
    console.log("obj", taskInput_obj);
  };

  return (
    <Modal>
      <form onSubmit={onSubmitHandler} className={classes.issueForm}>
        <label>
          Description:
          <input
            type="text"
            name="description"
            placeholder="Write a task"
            ref={descriptionRef}
          />
        </label>
        <div className={classes.bottomHalf}>
          <Tag innerTag={idNumber + 1} />
          <label>
            Assign to:
            <select name="assignee" id="" ref={assigneeRef}>
              {participantsNames.map((name) => {
                return (
                  <option key={Math.random()} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          </label>
          <div className={classes.tags}>
            <label>
              prority:
              <select name="prority" id="" ref={priortyRef}>
                {priorities.map((priority) => {
                  return (
                    <option key={Math.random()} value={priority}>
                      {priority}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        </div>
        <div className={classes.btns}>
          <Button type="submit" innerText="Create issue" />
          <Button onClick={onCloseModalHandler} innerText="Cancel" />
        </div>
      </form>
    </Modal>
  );
};

export default CreateIssue;
