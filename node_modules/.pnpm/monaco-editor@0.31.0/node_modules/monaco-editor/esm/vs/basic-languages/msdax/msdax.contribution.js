/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.31.0(252e010eb73ddc2fa1a37c1dade7bf35d87106cd)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/msdax/msdax.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "msdax",
  extensions: [".dax", ".msdax"],
  aliases: ["DAX", "MSDAX"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/msdax/msdax"], resolve, reject);
      });
    } else {
      return import("./msdax.js");
    }
  }
});
