import { t, Selector } from "testcafe";
import { selectByTestId } from "../utils";
export default class LoginPageModel {
  constructor() {
    this.userNameInput = selectByTestId("username-input");
    this.passwordInput = selectByTestId("password-input");
    this.submitButton = selectByTestId("submit-button");
    this.errorText = selectByTestId("error-text");
  }

  async login(username, password) {
    return await t
      .typeText(this.userNameInput, username)
      .typeText(this.passwordInput, password)
      .click(this.submitButton);
  }
}
