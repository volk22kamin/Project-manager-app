import classes from "./CreateIssue.module.css";
import Card from "../card/Card";
import Modal from "../modal/Modal";
import Tag from "../tag/Tag";
import Button from "../button/Button";

let idNumber = 0;

const CreateIssue = (props) => {
  const participantsNames = ["none", "velvel", "mike", "josh"];
  const priorities = ["none", "epic", "high", "low"];

  const onCloseModalHandler = () => {
    console.log("close");
    props.onCloseModal();
  };

  return (
    <Modal>
      <form className={classes.issueForm}>
        <label>
          Description:
          <input type="text" name="description" placeholder="Write a task" />
        </label>
        <div className={classes.bottomHalf}>
          <Tag innerTag={idNumber++} />
          <label>
            Assign to:
            <select name="assignee" id="">
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
              <select name="prority" id="">
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
