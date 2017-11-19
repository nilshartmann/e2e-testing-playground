import { t, Selector } from "testcafe";
import ReactSelector from "testcafe-react-selectors";

import { selectByTestId } from "../utils";

export default class GreetingController {
  constructor() {
    // this.greetingMaster = ReactSelector("GreetingMaster");
    this.greetingMaster = new GreetingMaster();
    this.greetingDetail = new GreetingDetail();
  }

  async ensureComponentActive(componentName) {
    if (componentName === "greetingMaster") {
      await t.expect(this.greetingMaster.exists).ok();
      await t.expect(this.greetingDetail.exists).notOk();
    } else if (componentName === "greetingDetail") {
      await t.expect(this.greetingMaster.exists).notOk();
      await t.expect(this.greetingDetail.exists).ok();
    } else {
      throw new Error(`Unknown component name: '${componentName}'`);
    }
  }
}

class GreetingMaster {
  constructor() {
    this.self = ReactSelector("GreetingMaster");
    this.greetingRows = this.self.find("tr");
    this.addButton = this.self.find("button");
  }

  get exists() {
    return this.self.exists;
  }

  async add() {
    await t.click(this.addButton);
  }
}

class GreetingDetail {
  constructor() {
    this.self = ReactSelector("GreetingDetail");

    this.nameInput = this.self.find("input[name='name']");
    this.greetingInput = this.self.find("input[name='greeting']");

    this.saveButton = this.self.find("button").withText("Save");
  }

  get exists() {
    return this.self.exists;
  }

  async addGreeting(name, greeting) {
    return await t
      .typeText(this.nameInput, name)
      .typeText(this.greetingInput, greeting)
      .click(this.saveButton);
  }
}
