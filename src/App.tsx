import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "emotion-theming";
import { Unsubscribe } from "firebase";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { RootState, UserActionTypes, User } from "custom-types";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./store/selectors/selectors";
import theme from "./Theme/theme";
import Header from "./components/header/Header";
import HomePage from "./pages/homePage/HomePage";
import ShopPage from "./pages/shop/Shop";
import SignInAndSignUpPage from "./pages/signInAndSignUp/SignInAndSignUp";
import CheckoutPage from "./pages/checkout/Checkout";
import { auth, createUserProfileDoc } from "./firebase/firebase.utils";
import { setCurrentUser } from "./store/actions/user";

import "./App.css";

interface AppSelectors {
  currentUser: User;
}

// Using createStructuredSelector because in the future there will be more selectors
const mapStateToProps = createStructuredSelector<RootState, AppSelectors>({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch: Dispatch<UserActionTypes>) => ({
  setCurrentUser: (user: User) => dispatch(setCurrentUser(user)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;

class App extends Component<AppProps> {
  unsubscribeFromAuth: Unsubscribe | null = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDoc(user);

        userRef?.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(user);
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeFromAuth !== null) {
      this.unsubscribeFromAuth();
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </ThemeProvider>
    );
  }
}

export default connector(App);
