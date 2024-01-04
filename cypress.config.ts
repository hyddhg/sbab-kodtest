// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "cypress";

let baseUrl: string;

if (process.env.NODE_ENV === "test") {
  baseUrl = "add a URL to the test environment here";
} else {
  baseUrl = "http://localhost:3000"; // Running the frontend locally
}

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {},

  video: false,
  screenshotOnRunFailure: false,
});
