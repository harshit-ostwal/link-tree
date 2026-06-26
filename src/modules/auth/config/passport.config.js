import GitHubStrategy from "../strategies/github.strategy.js";
import GoogleStrategy from "../strategies/google.strategy.js";

const passportInit = () => {
  GoogleStrategy();
  GitHubStrategy();
};

export default passportInit;
