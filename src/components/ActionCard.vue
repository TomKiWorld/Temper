<script lang="ts" setup>
import type { Action } from "@/types/types";

defineProps<{
  action: Action;
}>();

// emits
defineEmits(["undo"]);
</script>

<template>
  <div v-if="action" class="action-card">
    <h2 class="action-card__title">
      Moved post {{ action.id }} from index {{ action.index }} to index
      {{ action.newIndex }}
    </h2>
    <button class="btn btn--secondary" @click="$emit('undo')">
      Time travel
    </button>
  </div>
</template>

<style lang="scss" scoped>
.action-card {
  padding: $sp-s;
  background-color: var(--white-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;

  &__actions {
    display: flex;
    flex-direction: column;
    height: 2rem;
    justify-content: space-between;

    &.single {
      justify-content: center;
    }
  }

  &__arrow {
    width: 0.7rem;
    height: 0.5rem;
    cursor: pointer;
    transition: all 200ms ease-in-out;
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
}
</style>
