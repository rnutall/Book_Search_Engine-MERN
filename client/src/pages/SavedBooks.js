import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { getMe, deleteBook } from '../utils/API';
// import the Query ME and the REMOVE_BOOK from the mutations and query file
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";
import { REMOVE_BOOK, SAVE_BOOK } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";

const SavedBooks = () => {
  const [userData, setUserData] = useQuery(SAVE_BOOK);
  // create a const for the userData that runs the query that returns the users data

  // const [userData, setUserData] = useState({});
  // create a const for the removeBook method
  const [removeBook,] = useMutation(REMOVE_BOOK);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // replace this functionality with the removeBook mutation. LOOK IN THE MUTATIONS FILE IN UTILS. ***rememeber the variable that needs to be sent in to the remove book mutation
      const { data } = await REMOVE_BOOK({
        variables: { bookId },
      });

      if (!data.removeBook) {
        throw new Error("something went wrong!");
      }

      const updatedUser = { ...userData };
      updatedUser.savedBooks = updatedUser.savedBooks.filter(
        (book) => book.bookId !== bookId
      );

      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userData) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
