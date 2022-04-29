import classes from "./Modal.module.css";

import { Fragment } from "react";

const BackDrop = (props) => {
  return (
    <div onClick={props.onClose} className={classes.backdrop}>
      {props.children}
    </div>
  );
};

const ModalOverLay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      <BackDrop>
        <ModalOverLay>{props.children}</ModalOverLay>
      </BackDrop>
    </Fragment>
  );
};

export default Modal;
