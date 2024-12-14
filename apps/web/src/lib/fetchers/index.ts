import "server-only";

import {
  getPostForRender,
  getPosts,
  getPostsCountByStatus,
  getPostsForEdit,
} from "./posts";
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
    getPostForRender,
  },
  user: {
    getUserDataTable,
    getUserCountByRole,
    getUserSettingsKVType,
  },
};

export default fetch;
