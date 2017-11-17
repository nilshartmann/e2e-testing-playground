import React from "react";

import GreetingController from "./GreetingController";
import GreetingDisplayController from "./GreetingDisplayController";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authorization, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authorization ? (
        <Component authorization={authorization} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )}
  />
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onAuthenticationSucceeded(authorization) {
    this.setState({
      authorization
    });
  }

  logout() {
    this.setState({ authorization: null });
  }

  render() {
    return (
      <Router>
        <div>
          <h1>Greetings</h1>
          <Switch>
            <Route path="/greet/:greetingId" component={GreetingDisplayController} />
            <Route
              path="/login"
              render={props => <Login onAuthenticationSucceeded={a => this.onAuthenticationSucceeded(a)} {...props} />}
            />
            <PrivateRoute path="/" component={GreetingController} authorization={this.state.authorization} />
          </Switch>
          {this.state.authorization && <button onClick={() => this.logout()}>Logout</button>}
        </div>
      </Router>
    );
  }
}

export default App;
