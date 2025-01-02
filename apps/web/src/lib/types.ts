export type PostType = {
  id: string;
  title: string;
  slug: string;
  post_type: string;
  post_status: string;
  created: Date;
  author: {
    id: string;
    username: string;
  };
  postmeta?: {
    key: string;
    value: string;
  }[];
};

export type PostCountByStatus = {
  all: number;
  published: number;
  pending: number;
  draft: number;
  trash: number;
};

export type UserSettingKVType = {
  id: string;
  key: string;
  value: string;
};

export type UserSettingsKVType = UserSettingKVType[];

export type ColumnViewType = {
  colId: string;
  title: string;
  show: boolean;
}[];

export type UserDataTableRowType = {
  id: string;
  username: string;
  email: string;
  role: string;
  roleId: string;
};

export type UserTableTabCountByRoleType = {
  all: number;
  admin: number;
  editor: number;
  author: number;
  subscribe: number;
  user: number;
};

export type CurrentUserType = {
  id: string;
  username: string;
  displayname: string;
  email: string;
  capability: string;
};

export type IconType = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => React.ReactElement;

export type SidebarMenuItemType = {
  title: string;
  url: string;
  icon: IconType;
};

export type PostForEditType = {
  id: string;
  title: string;
  slug: string;
  postType: string;
  postStatus: string;
  created: Date;
  content: string;
};

export type GetPostForRenderType = {
  content: string;
};

export type UpdateUserProfileType = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type UserProfileForEditByAdminType = {
  userId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};
