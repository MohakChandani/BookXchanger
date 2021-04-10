import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PulseLoader from "react-spinners/PulseLoader";
import Book from "../../AllBooksComponents/Book/Book";
import {
  Button,
  Grid,
  CircularProgress,
  Grow,
  Container,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core";
import useStyles from "./style";
import { getBooks } from "../../../actions/books";

const BookSlider = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const allBooks = useSelector((state) => state.books);
  const [allUnSoldbooks, setAllUnSoldBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffff00");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    console.log("Getting Books");
    //accepts an action call as an argument -> goes to actions folder
    dispatch(getBooks());
  }, [dispatch]);

  useEffect(() => {
    if (allBooks.length !== 0) {
      setAllUnSoldBooks(allBooks.filter((book) => book.isSold === false));
    }
  }, [allBooks.length]);

  useEffect(() => {
    if (allUnSoldbooks.length > 5) {
      var indices = [];
      while (indices.length < 5) {
        var r = Math.floor(Math.random() * allUnSoldbooks.length);
        if (indices.indexOf(r) === -1) indices.push(r);
      }
      console.log(indices);
      const arr = [];
      for (const i of indices) {
        arr.push(allUnSoldbooks[i]);
      }
      setBooks(arr);
      // for (var i=0;i<5;i++) {
      //   var r = Math.floor(Math.random() * allUnSoldbooks.length)
      //   console.log("Book in Slider" + r);
      //   setBooks([...books,allUnSoldbooks[r]]);
      // }
    } else {
      setBooks(allUnSoldbooks);
    }
  }, [allUnSoldbooks]);

  useEffect(() => {
    if (allBooks.length !== 0) {
      setLoading(false);
    }
  }, [allBooks]);

  const override = css`
    display: block;
    margin-left: 45%;
    border-color: red;
  `;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 460 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 460, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div style={{ background: "rgb(234,231,220)" }}>
        <Typography
          variant="h6"
          style={{
            textAlign: "center",
            background: "rgb(234,231,220)",
            paddingTop: "10px",
          }}
        >
          Most Trending Books
        </Typography>
        <hr
          style={{
            border: "1.5px solid #8e8d8a",
            width: "300px",
            background: "rgb(234,231,220)",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        />
      </div>

      {loading ? (
        <PulseLoader
          loading={loading}
          color="#e98074"
          css={override}
          size={30}
        />
      ) : (
        <div
          style={{
            padding: "20px 10px",
            background: "rgb(234,231,220)",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        >
          <Carousel
            responsive={responsive}
            arrows={false}
            infinite={true}
            autoPlay={true}
          >
            {books.map((book) => (
              <Grid>
                <Container>
                  <Book key={book._id} book={book} />
                </Container>
              </Grid>
            ))}
          </Carousel>
        </div>
      )}

      <div style={{ background: "rgb(234,231,220)" }}>
        <Typography
          variant="h6"
          style={{
            textAlign: "center",
            background: "rgb(234,231,220)",
            paddingTop: "10px",
          }}
        >
          Most Viewed Books
        </Typography>
        <hr
          style={{
            border: "1.5px solid #8e8d8a",
            width: "300px",
            background: "rgb(234,231,220)",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        />
      </div>

      {loading ? (
        <PulseLoader
          loading={loading}
          color="#e98074"
          css={override}
          size={30}
          style={{ background: "rgb(234,231,220)" }}
        />
      ) : (
        <div
          style={{
            padding: "20px 10px",
            background: "rgb(234,231,220)",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        >
          <Carousel
            responsive={responsive}
            arrows={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={6000}
          >
            {books.map((book) => (
              <Grid>
                <Container>
                  <Book key={book._id} book={book} />
                </Container>
              </Grid>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default BookSlider;
