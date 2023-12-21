import type { Store } from "pinia";
import type { Ref } from "vue";
export type Empty = null | undefined;
export type StringNumber = string | number;
export type StringNumberBoolean = StringNumber | boolean;

export type ImportPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Post = ImportPost & {
  index: number;
};

export type Action = {
  id: number;
  newIndex: number;
  index: number;
};

export type PostsStore = Store<
  "PostsStore",
  {
    posts: Post[];
    error: Ref<string>;
    commited: Action[];
  },
  { orderedPosts: Post[] },
  {
    fill: () => void;
    addAction: (post: Post, action: number) => void;
  }
>;

export type PiniaHistory = {
  undo: () => void;
  redo: () => void;
  history: string[];
  future: string[];
};
