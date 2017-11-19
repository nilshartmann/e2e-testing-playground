import { Selector } from "testcafe";
import { ClientFunction } from "testcafe";

import LoginPageModel from "./LoginPageModel";

fixture`Login Page`.page`http://localhost:8080`;

// https://testcafe-discuss.devexpress.com/t/how-to-handle-redirect/496/2
const getPagePath = ClientFunction(() => window.location.pathname);

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
