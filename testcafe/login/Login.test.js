import { Selector } from "testcafe";
import { getPagePath } from "../utils";
import LoginPageModel from "./LoginPageModel";

fixture`Login Page`.page`http://localhost:8080`;

const loginPageModel = new LoginPageModel();

test("Display error message on invalid login", async t => {
  const errorText = loginPageModel.errorText.exists;

  await t.expect(errorText).notOk();
  await loginPageModel.login("paul", "wrongpassword");
  await t.expect(errorText).ok();
});

test("Forward to root page after succesful login", async t => {
  await t.expect(getPagePath()).eql("/login");
  await loginPageModel.login("paul", "secret");

  // now we should be redirected to root page
  await t.expect(getPagePath()).eql("/");
});
