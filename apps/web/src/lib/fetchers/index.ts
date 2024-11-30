import "server-only";

import { getPosts, getPostsCountByStatus } from "./posts";
import { checkDatabaseConnection, checkSiteAdmin } from "./checkDB";
import { getUserSettingsKVType, getUserDataTable } from "./users";

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
    getUserDataTable,
    getUserSettingsKVType,
  },
};

export default fetch;
