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
  getCurrentUserProfile,
  getUserDataTable,
  getUserSettingsKVType,
  getUserProfileForEditByAdmin,
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
    getCurrentUserProfile,
    getUserProfileForEditByAdmin,
  },
};

export default fetch;
