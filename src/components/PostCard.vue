<script lang="ts" setup>
import SvgChevron from "./SvgChevron.vue";
import type { Post, PostsStore } from "@/types/types";
import { usePostsStore } from "@/stores/PostsStore";

const postsStore: PostsStore = usePostsStore();

defineProps<{
  post: Post;
  single: string;
}>();
</script>

<template>
  <div v-if="post" class="post-card app-radius">
    <h2 class="post-card__title">Post {{ post.id }}</h2>
    <div class="post-card__actions" :class="{ single: !!single }">
      <button v-if="single != 'down'" class="btn up" aria-label="Move up">
        <SvgChevron
          class="post-card__arrow up"
          @click="postsStore.addAction(post, -1)"
        />
      </button>
      <button v-if="single != 'up'" class="btn down" aria-label="Move down">
        <SvgChevron
          class="post-card__arrow down"
          @click="postsStore.addAction(post, 1)"
        />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-card {
  padding: $sp-s;
  background-color: var(--white-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--box-shadow);
  font-size: 0.8rem;
  transition: transform 200ms ease-in-out;

  &__actions {
    display: flex;
    flex-direction: column;
    height: 2.5rem;
    justify-content: space-between;

    &.single {
      justify-content: center;
    }
  }
  .btn {
    display: inline-flex;
    padding: 0;
    line-height: unset;
    &.up {
      align-items: flex-start;
      margin-top: -0.25rem;
    }
    &.down {
      align-items: flex-end;
      margin-bottom: -0.25rem;
    }
  }

  &__arrow {
    width: 0.7rem;
    height: 0.5rem;
    cursor: pointer;
    transition: fill 200ms ease-in-out;
    padding: $sp-xs;

    &.up {
      transform: rotate(-90deg);
    }

    &.down {
      transform: rotate(90deg);
    }

    &:hover,
    &:focus-visible {
      fill: var(--secondary-color);
    }
  }

  &:hover,
  &:focus-visible {
    transform: scale(1.05);
  }
}
</style>
