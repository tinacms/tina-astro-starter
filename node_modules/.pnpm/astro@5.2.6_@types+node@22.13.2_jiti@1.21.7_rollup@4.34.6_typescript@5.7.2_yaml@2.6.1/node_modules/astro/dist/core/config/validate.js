import { errorMap } from "../errors/index.js";
import { createRelativeSchema } from "./schema.js";
async function validateConfig(userConfig, root, cmd) {
  const AstroConfigRelativeSchema = createRelativeSchema(cmd, root);
  return await AstroConfigRelativeSchema.parseAsync(userConfig, { errorMap });
}
export {
  validateConfig
};
