import type { Post, ImportPost, Action } from "../types/types";
import { defineStore, acceptHMRUpdate } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";

export const usePostsStore = defineStore("PostsStore", {
  state: () => ({
    posts: reactive([]) as Post[],
    error: ref<string>(""),
    commited: reactive([]) as Action[],
  }),

  // Actions
  actions: {
    async fill() {
      await axios
        .get("https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5")
        .then((response) => {
          let index = 0;
          const posts = response.data.map((post: ImportPost) => {
            return {
              index: index++,
              ...post,
            };
          });
          this.posts = posts;
        })
        .catch((error) => {
          console.log(error);
          this.error = "Error retrieving data";
        });
    },
    addAction(post: Post, action: number) {
      const updatedPosts = [...this.posts];
      const { id, index } = post;
      const newIndex = index + action;
      const currectPostIndex = updatedPosts.findIndex((post) => post.id == id);
      const nextPostIndex = currectPostIndex + action;
      if (currectPostIndex > -1 && nextPostIndex > -1) {
        updatedPosts[currectPostIndex].index = newIndex;
        updatedPosts[nextPostIndex].index = index;
        this.posts = [...updatedPosts];
        this.commited.unshift({ id, newIndex, index });
      }
    },
  },

  // Getters
  getters: {
    orderedPosts: (state) => {
      return state.posts.sort((a, b) => a.index - b.index);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot));
}
