<script setup lang="ts">
import type { PostsStore, PiniaHistory } from "@/types/types";
import { usePostsStore } from "@/stores/PostsStore";
import ActionCard from "@/components/ActionCard.vue";
import PostCard from "@/components/PostCard.vue";

const postsStore: PostsStore = usePostsStore();
const postsStoreWithHistory = postsStore as PostsStore & PiniaHistory;
postsStore.fill();
const getSingle = (index: number): string => {
  return index == 0
    ? "down"
    : index == postsStore.orderedPosts.length - 1
    ? "up"
    : "";
};

const undo = (count: number) => {
  for (let i = 0; i < count; i++) {
    postsStoreWithHistory.undo();
  }
};
</script>

<template>
  <article class="posts">
    <main class="posts__container container m-auto p-10">
      <section class="posts__overview">
        <h1 class="posts__title c-t-w">Sortable Post List</h1>
        <ul v-if="postsStore.orderedPosts.length > 0" class="posts__list">
          <li
            v-for="(post, index) in postsStore.orderedPosts"
            :key="post.id"
            class="posts__list-item"
          >
            <PostCard :post="post" :single="getSingle(index)" />
          </li>
        </ul>
        <p v-else class="posts__empty app-radius">
          It seems no posts were found. Please try again later.
        </p>
      </section>
      <section class="posts__actions app-radius">
        <h2 class="posts__title c-t-b">List of actions commited</h2>
        <ul v-if="postsStore.commited.length > 0" class="posts__actions-list">
          <li
            class="posts__actions-card"
            v-for="(action, index) in postsStore.commited"
            :key="index"
          >
            <ActionCard :action="action" @undo="undo(index + 1)" />
          </li>
        </ul>
        <p v-else class="posts__empty">
          The actions list is empty, move some posts around using the arrows on
          each post card
        </p>
      </section>
    </main>
  </article>
</template>

<style lang="scss" scoped>
.posts {
  padding-top: $sp-r;

  &:before,
  &:after {
    content: "";
    position: fixed;
    width: 100vw;
    top: 0;
    right: 0;
    user-select: none;
  }

  &:before {
    height: 100vh;
    left: 0;
    bottom: 0;
    background-color: var(--light-grey-color);
    z-index: -2;
  }

  &:after {
    border-top: 12.5vh solid var(--primary-color);
    border-right: 100vw solid transparent;
    z-index: -1;
  }

  &__container {
    display: grid;
    gap: $sp-r;
    align-items: start;

    @include breakpoint(medium) {
      grid-template-columns: 40% calc(60% - 4rem);
      gap: 4rem;
    }
  }

  &__list {
    display: grid;
    gap: $sp-r;
    margin-top: $sp-r;
    transition: grid-template 300ms;
  }

  &__title {
    font-weight: 400;
  }

  &__overview {
    .posts__empty {
      margin-top: $sp-r;
      padding: $sp-s;
      background-color: var(--white-color);
    }
  }

  &__empty {
    padding: $sp-r;
    font-size: 0.875rem;
    line-height: 1.5rem;
    font-style: italic;
    box-shadow: var(--box-shadow);
  }

  &__actions {
    background-color: var(--light-grey-color);
    box-shadow: var(--box-shadow);
    overflow: hidden;

    &-list {
      padding: $sp-r;
    }

    &-card {
      overflow: hidden;
      box-shadow: var(--box-shadow);

      &:first-of-type {
        border-top-right-radius: var(--border-radius);
        border-top-left-radius: var(--border-radius);
      }

      &:last-of-type {
        border-bottom-right-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
    }

    .posts__title {
      padding: $sp-r;
      background-color: var(--white-color);
    }
  }
}
</style>
