import "server-only";

import { getPosts, getPostsCountByStatus } from "./posts";
import { checkDatabaseConnection, checkSiteAdmin } from "./checkDB";
import {
  getUserCountByRole,
  getUserDataTableByRole,
  getUserSettingsKVType,
} from "./users";

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
    getUserCountByRole,
    getUserSettingsKVType,
  },
};

export default fetch;
