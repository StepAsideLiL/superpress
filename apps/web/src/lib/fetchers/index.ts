import "server-only";

import { getPosts, getPostsCountByStatus } from "./posts";
import { checkDatabaseConnection, checkSiteAdmin } from "./checkDB";
import { getUserSettingsKVType, getUserDataTableByRole } from "./users";

const fetch = {
  check: {
    checkDatabaseConnection,
    checkSiteAdmin,
  },
  post: {
    getPosts,
    getPostsCountByStatus,
  },
  user: {
    getUserDataTableByRole,
    getUserSettingsKVType,
  },
};

export default fetch;
