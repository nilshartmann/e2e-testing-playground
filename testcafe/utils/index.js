import { ClientFunction, Selector } from "testcafe";

// https://testcafe-discuss.devexpress.com/t/how-to-handle-redirect/496/2
const getPagePath = ClientFunction(() => window.location.pathname);

const selectByTestId = testDataId => Selector(`[data-test-id="${testDataId}"]`);

export { getPagePath, selectByTestId };
