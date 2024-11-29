import "server-only";

import { getPosts, getPostsCountByStatus } from "./posts";
import { checkDatabaseConnection, checkSiteAdmin } from "./checkDB";
import { getUserSettingsKVType } from "./users";

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
    getUserSettingsKVType,
  },
};

export default fetch;
