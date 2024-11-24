export type PostType = {
  id: bigint;
  title: string;
  slug: string;
  post_type: string;
  post_status: string;
  created: Date;
  author: {
    id: bigint;
    username: string;
  };
  usermeta?: {
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
