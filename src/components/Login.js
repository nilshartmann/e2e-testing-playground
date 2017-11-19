import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }

  getFrom() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    return from;
  }

  render() {
    const from = this.getFrom();

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <input
          data-test-id="username-input"
          onChange={event => this.updateModel(event)}
          name="username"
          placeholder="Your name"
          value={this.state.username}
        />
        <input
          data-test-id="password-input"
          onChange={event => this.updateModel(event)}
          name="password"
          placeholder="Password"
          value={this.state.password}
        />
        <button data-test-id="submit-button" onClick={() => this.submitLogin()}>
          Login
        </button>
        {this.state.error && <p data-test-id="error-text">{this.state.error}</p>}
      </div>
    );
  }

  updateModel(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async submitLogin() {
    this.setState({ error: "" });
    try {
      const response = await fetch("http://localhost:7000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      });
      const json = await response.json();

      if (response.ok) {
        const authorization = {
          user: json.user,
          token: json.token
        };
        this.props.onAuthenticationSucceeded(authorization);
        this.props.history.push(this.getFrom());
      } else {
        const error = `Authentication failed: ${json.error || "unknown reason"} `;
        this.setState({ error });
      }
    } catch (e) {
      console.error(e);
      this.setState({ error: "Authentication failed due to technical problem" });
    }
  }
}

export default Login;
