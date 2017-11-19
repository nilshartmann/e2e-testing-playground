import { Selector } from "testcafe";

fixture`Sample`.page`http://localhost:8080/sample`;

test("Test Cafe Basic API understanding", async t => {
  const theLabel = Selector("[data-test-id='hello-world-label']");
  await t
    .expect(theLabel.exists)
    .notOk()
    .click("input")
    .expect(theLabel.exists)
    .ok();

  await t.expect(theLabel.textContent, "World");
});
