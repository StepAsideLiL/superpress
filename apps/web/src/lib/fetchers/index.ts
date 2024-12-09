import "server-only";

import { getPosts, getPostsCountByStatus, getPostsForEdit } from "./posts";
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
    getPostsForEdit,
  },
  user: {
    getUserDataTable,
    getUserCountByRole,
    getUserSettingsKVType,
  },
};

export default fetch;
