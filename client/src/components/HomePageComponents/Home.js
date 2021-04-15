import React, { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Description from "./Description/Description.js";
import HowToUse from "./HowToUse/HowToUse.js";
import BookSlider from "./BookSlider/BookSlider.js";
import { AlertTitle } from "@material-ui/lab";
import Feedback from "./Feedback/Feedback.js";
import { useSelector, useDispatch } from "react-redux";
import { AUTH, CLEAR_NOTIFICATION, VALID } from "../../constants/actions.js";
import Roll from "react-reveal/Roll";
import LightSpeed from "react-reveal/LightSpeed";
import Flip from "react-reveal/Flip";
import { socket } from "../../service/socket";
import { getBooks } from "../../actions/books";
const Home = () => {
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();

  const book = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  useEffect(() => {
    if (book.msg) setAlert(true);
  }, []);

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
    dispatch({ type: VALID, payload: {} });
  };

  return (
    <>
      <div style={{ background: "e85a4f" }}>
        {alert ? (
          <Snackbar
            style={{ top: "10%", left: "50%" }}
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            open={alert}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              <strong>{book.msg}</strong>
            </Alert>
          </Snackbar>
        ) : null}
        <Description />
        <BookSlider />
        <HowToUse />
        <Feedback />
      </div>
    </>
  );
};

export default Home;
