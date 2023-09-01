import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import LandingPage from "./components/SplashPageComponents/LandingPage";
import NavBar from "./components/NavBar";
import BrowseBooks from "./components/BookComponents/BrowseBooks";
import BrowseLists from "./components/ListComponents/BrowseLists";
import BookDetails from "./components/BookComponents/BookDetails";
import EditBook from "./components/BookComponents/EditBook";
import ReviewForm from "./components/ReviewComponents/ReviewForm";
import SearchResults from "./components/Search/SearchResults";
import UserHomePage from "./components/UserHomePage";
import BookForm from "./components/BookComponents/BookForm";
import ListForm from "./components/ListComponents/ListForm";
import ListDetails from "./components/ListComponents/ListDetails";
import BookshelfDetails from "./components/BookshelfComponents/BookshelfDetails";
import AppHomePage from "./components/AppHomePage";
import LoginFormPage from "./components/AuthComponents/LoginFormPage";
import SignupFormPage from "./components/AuthComponents/SignupFormPage";
import MyBooksPage from "./components/BookshelfComponents/MyBooksPage";
import AboutMe from "./components/SplashPageComponents/AboutMe";
import Navigation from "./components/SplashPageComponents/Navigation";
import RequireLogin from "./components/UtiltyComponents/RequireLogin";
import NotFoundPage from "./components/UtiltyComponents/NotFoundPage";

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
          <Route exact path="/about-me">
            <Navigation />
            <AboutMe />
          </Route>
          <Route path="/app">
            <NavBar />
            <Switch>
              <Route path="/app/browse-books">
                <RequireLogin isLoaded={isLoaded} />
                <BrowseBooks />
              </Route>
              <Route path="/app/my-books">
                <RequireLogin isLoaded={isLoaded} />
                <MyBooksPage />
              </Route>
              <Route path="/app/browse-lists">
                <RequireLogin isLoaded={isLoaded} />
                <BrowseLists />
              </Route>
              <Route path="/app/books/:bookId/details">
                <RequireLogin isLoaded={isLoaded} />
                <BookDetails />
              </Route>
              <Route path="/app/books/:bookId/edit">
                <RequireLogin isLoaded={isLoaded} />
                <EditBook type="EDIT" />
              </Route>
              <Route path="/app/books/:bookId/review">
                <RequireLogin isLoaded={isLoaded} />
                <ReviewForm type="CREATE" />
              </Route>
              <Route path="/app/reviews/:reviewId/edit">
                <RequireLogin isLoaded={isLoaded} />
                <ReviewForm type="EDIT" />
              </Route>
              <Route path="/app/books/search">
                <RequireLogin isLoaded={isLoaded} />
                <SearchResults />
              </Route>
              <Route path="/app/user">
                <RequireLogin isLoaded={isLoaded} />
                <UserHomePage />
              </Route>
              <Route path="/app/create-book">
                <RequireLogin isLoaded={isLoaded} />
                <BookForm type="CREATE" />
              </Route>
              <Route path="/app/create-list">
                <RequireLogin isLoaded={isLoaded} />
                <ListForm type="CREATE" />
              </Route>
              <Route path="/app/lists/:listId/edit">
                <RequireLogin isLoaded={isLoaded} />
                <ListForm type="EDIT" />
              </Route>
              <Route path="/app/lists/:listId/details">
                <RequireLogin isLoaded={isLoaded} />
                <ListDetails />
              </Route>
              <Route path="/app/bookshelves/:shelfId/details">
                <RequireLogin isLoaded={isLoaded} />
                <BookshelfDetails />
              </Route>
              {/* <Route exact path="/app">
                <RequireLogin isLoaded={isLoaded} />
                <AppHomePage isLoaded={isLoaded} />
              </Route> */}
              <Route>
                <NotFoundPage />
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
            <NotFoundPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
