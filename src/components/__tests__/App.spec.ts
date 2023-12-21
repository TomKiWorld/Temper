import { mount } from "@vue/test-utils";
import { createApp } from "vue";
import { beforeEach, describe, it, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { PiniaHistory } from "@/plugins/PiniaHistory";
import { createTestingPinia } from "@pinia/testing";
import { usePostsStore } from "@/stores/PostsStore";
import App from "@/App.vue";

describe("App", async () => {
  beforeEach(() => {
    const app = createApp({});
    const pinia = createPinia().use(PiniaHistory);
    app.use(pinia);
    setActivePinia(pinia);
  });
  const wrapper = mount(App, {
    global: {
      plugins: [
        createTestingPinia({
          stubActions: false,
          plugins: [PiniaHistory],
        }),
      ],
    },
  });

  it("Expect App to exist", () => {
    expect(App).toBeTruthy();
  });

  it("Expect it to show the title", () => {
    expect(wrapper.find(".posts__title").html()).toContain(
      "Sortable Post List"
    );
  });

  it("Expect store to fetch 5 posts and no commited actions", async () => {
    const postsStore = usePostsStore();
    await postsStore.fill();
    expect(postsStore.orderedPosts.length).toBe(5);
    expect(postsStore.commited.length).toBe(0);
  });

  it("Expect it to show 5 posts", async () => {
    const wrapper = mount(App);
    const postsStore = usePostsStore();
    await postsStore.fill();
    const listItems = await wrapper.findAll(".posts__list-item");
    expect(listItems.length).toBe(5);
  });

  it("Expect the order of posts to change", async () => {
    const wrapper = mount(App);
    const postsStore = usePostsStore();
    await postsStore.fill();
    const orderedPosts = postsStore.orderedPosts;
    await postsStore.addAction(orderedPosts[1], -1);
    const listItems = await wrapper.findAll(".posts__list-item");
    expect(listItems[0].html()).toContain(`Post ${orderedPosts[1].id}`);
    await postsStore.addAction(orderedPosts[2], 1);
    expect(listItems[3].html()).toContain(`Post ${orderedPosts[3].id}`);
  });

  it("Adds actions", async () => {
    const postsStore = usePostsStore();
    await postsStore.fill();
    const orderedPosts = postsStore.orderedPosts;
    postsStore.addAction(orderedPosts[1], 1);
    expect(postsStore.commited.length).toBe(1);
    postsStore.addAction(orderedPosts[4], -1);
    expect(postsStore.commited.length).toBe(2);
  });

  it("snap shot matches", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
