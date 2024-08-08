import { connect } from "react-redux";
import { closeModal } from "../../redux/modalSlice";

import Modal from "./Modal";

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.isOpen,
    title: state.modal.title,
    content: state.modal.content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => {
      dispatch(closeModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
