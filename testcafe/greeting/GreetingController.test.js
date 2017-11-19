import { Selector } from "testcafe";
import LoginPageModel from "../login/LoginPageModel";
import GreetingControllerModel from "./GreetingControllerModel";
import ReactSelector from "testcafe-react-selectors";

fixture`GreetingController Page`.page`http://localhost:8080/`;

const loginPageModel = new LoginPageModel();
const greetingControllerModel = new GreetingControllerModel();

test("Display list of greetings, add a new one, display updated list", async t => {
  await loginPageModel.login("paul", "secret");

  await greetingControllerModel.ensureComponentActive("greetingMaster");
  const greetingCount = await greetingControllerModel.greetingMaster.greetingRows.count;
  await t.expect(greetingCount).gte(10);
  await greetingControllerModel.greetingMaster.add();

  await greetingControllerModel.ensureComponentActive("greetingDetail");
  await greetingControllerModel.greetingDetail.addGreeting("TestCafe", "hello, hello");

  await greetingControllerModel.ensureComponentActive("greetingMaster");
  await t.expect(greetingControllerModel.greetingMaster.greetingRows.count).gt(greetingCount);
});
