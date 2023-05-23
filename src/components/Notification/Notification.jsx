import React, { memo, useEffect, useState } from "react";

// prop types
import PropTypes from "prop-types";

// @mui
import Alert from "../MUI/Alert";
import Snackbar from "../MUI/Snackbar";

const Notification = (props) => {
  const { visible, text, type, onClose } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        variant="filled"
        onClose={onClose}
        severity={type}
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

Notification.propTypes = {
  visible: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired, // error warning info success
  onClose: PropTypes.func.isRequired,
};

const NotificationMemo = memo(
  (props) => <Notification {...props} />,
  arePropsEqual
);

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.visible === newProps.visible &&
    oldProps.text === newProps.text &&
    oldProps.type === newProps.type &&
    oldProps.onClose === newProps.onClose
  );
}

export default NotificationMemo;
