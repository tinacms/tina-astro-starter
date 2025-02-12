import { version as ReactVersion } from "react-dom";
function getReactMajorVersion() {
  const matches = /\d+\./.exec(ReactVersion);
  if (!matches) {
    return NaN;
  }
  return Number(matches[0]);
}
function isUnsupportedVersion(majorVersion) {
  return majorVersion < 17 || majorVersion > 19 || Number.isNaN(majorVersion);
}
const versionsConfig = {
  17: {
    server: "@astrojs/react/server-v17.js",
    client: "@astrojs/react/client-v17.js"
  },
  18: {
    server: "@astrojs/react/server.js",
    client: "@astrojs/react/client.js"
  },
  19: {
    server: "@astrojs/react/server.js",
    client: "@astrojs/react/client.js"
  }
};
export {
  getReactMajorVersion,
  isUnsupportedVersion,
  versionsConfig
};
