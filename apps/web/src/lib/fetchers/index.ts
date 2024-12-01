import "server-only";

import { getPosts, getPostsCountByStatus } from "./posts";
import { checkDatabaseConnection, checkSiteAdmin } from "./checkDB";
import {
  getUserCountByRole,
  getUserDataTable,
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
    getUserDataTable,
    getUserCountByRole,
    getUserSettingsKVType,
  },
};

export default fetch;
