# end-to-end Testing Playground

Playground to try several end-to-end testing approaches and frameworks (for React applications)

## TestCafe (https://devexpress.github.io/testcafe/)

1. Make sure both, API and Frontend are up and running:

```
# run the API server
yarn server

# run the webpack dev server
yarn start
```

2. Run test testsuite (using firefox):

```
yarn testcafe
```

(you can switch the browser in the `package.json` file, for example to `chrome`, `firefox:headless`, `chrome:headless` or `puppeteer`)

Test cases are located inside the `testcafe` folder. Some are modelled with PageObjects as described in the TestCafe
documentation.

Some test cases also use the `testcafe-react-selectors` that allow **finding React components** inside the browser (see for  example
`GreetingDisplay.test.js`)


