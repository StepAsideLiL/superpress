import "server-only";

import { getPosts, getPostsCountByStatus } from "./posts";
import { checkDatabaseConnection, checkSiteAdmin } from "./checkDB";

const db = {
  check: {
    checkDatabaseConnection,
    checkSiteAdmin,
  },
  post: {
    getPosts,
    getPostsCountByStatus,
  },
};

export default db;
