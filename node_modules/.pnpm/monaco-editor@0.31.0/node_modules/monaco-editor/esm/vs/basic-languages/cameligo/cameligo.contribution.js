/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.31.0(252e010eb73ddc2fa1a37c1dade7bf35d87106cd)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/cameligo/cameligo.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "cameligo",
  extensions: [".mligo"],
  aliases: ["Cameligo"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/cameligo/cameligo"], resolve, reject);
      });
    } else {
      return import("./cameligo.js");
    }
  }
});
