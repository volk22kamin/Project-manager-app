import Modal from "../modal/Modal";

const TestModal = () => {
  return (
    <Modal>
      <form>
        <label>Description</label>
        <input type="text" value={props.descValue ? props.descValue : ""} />
      </form>
    </Modal>
  );
};

export default TestModal;
