import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import LandingPage from "./components/LandingPage";
import AppHomePage from "./components/AppHomePage";
import NavBar from "./components/NavBar";
import BrowseBooks from "./components/BrowseBooks";
import BookDetails from "./components/BookDetails";
import UserHomePage from "./components/UserHomePage";
import BookForm from "./components/BookForm";
import EditBook from "./components/EditBook";
import SearchResults from "./components/Search/SearchResults";
import ReviewForm from "./components/ReviewForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage isLoaded={isLoaded} />
          </Route>
          <Route path="/app">
            <NavBar />
            <Switch>
              <Route path="/app/browse-books">
                <BrowseBooks />
              </Route>
              <Route path="/app/books/:bookId/details">
                <BookDetails />
              </Route>
              <Route path="/app/books/:bookId/edit">
                <EditBook />
              </Route>
              <Route path='/app/books/:bookId/review'>
                <ReviewForm />
              </Route>
              <Route path='/app/books/search'>
                <SearchResults />
              </Route>
              <Route path='/app/user'>
                <UserHomePage />
              </Route>
              <Route path="/app/create-book">
                <BookForm type='CREATE'/>
              </Route>
              <Route path="*">
                <AppHomePage isLoaded={isLoaded} />
              </Route>
            </Switch>
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route>
            <h1>404: Page not found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
