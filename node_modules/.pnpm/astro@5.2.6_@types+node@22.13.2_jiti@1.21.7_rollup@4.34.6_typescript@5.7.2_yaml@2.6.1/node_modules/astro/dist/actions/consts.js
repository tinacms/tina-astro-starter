const VIRTUAL_MODULE_ID = "astro:actions";
const RESOLVED_VIRTUAL_MODULE_ID = "\0" + VIRTUAL_MODULE_ID;
const ACTIONS_TYPES_FILE = "actions.d.ts";
const VIRTUAL_INTERNAL_MODULE_ID = "astro:internal-actions";
const RESOLVED_VIRTUAL_INTERNAL_MODULE_ID = "\0astro:internal-actions";
const NOOP_ACTIONS = "\0noop-actions";
const ACTION_QUERY_PARAMS = {
  actionName: "_action",
  actionPayload: "_astroActionPayload"
};
const ACTION_RPC_ROUTE_PATTERN = "/_actions/[...path]";
export {
  ACTIONS_TYPES_FILE,
  ACTION_QUERY_PARAMS,
  ACTION_RPC_ROUTE_PATTERN,
  NOOP_ACTIONS,
  RESOLVED_VIRTUAL_INTERNAL_MODULE_ID,
  RESOLVED_VIRTUAL_MODULE_ID,
  VIRTUAL_INTERNAL_MODULE_ID,
  VIRTUAL_MODULE_ID
};
