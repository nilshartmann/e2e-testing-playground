import { Selector } from "testcafe";
import ReactSelector from "testcafe-react-selectors";

fixture`GreetingDisplay Page`.page`http://localhost:8080/greet/3`;

// search for elements by React Component
// https://github.com/DevExpress/testcafe-react-selectors/blob/master/README.md
const greetingControllerComponent = ReactSelector("GreetingDisplayController");

test("Should display a greeting without login required", async t => {
  await t.expect(greetingControllerComponent.textContent).eql("Bonjour, Max");

  // just as an experiment: access the component's state and properties

  // 1. state
  // for whatever reason, the returned state is empty, so this DOES not work:
  // await t.expect(greetingControllerComponent.getReact().state.greeting).ok();
  // because state is empty:
  // await t.expect(greetingControllerComponent.getReact().state).eql({});

  // 2. props
  const greetingId = await greetingControllerComponent.getReact(({ props }) => props.match.params.greetingId);
  await t.expect(greetingId).eql("3");
});
