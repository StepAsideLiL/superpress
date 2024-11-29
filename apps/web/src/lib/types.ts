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
