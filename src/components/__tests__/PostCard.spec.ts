import { mount } from "@vue/test-utils";
import type { Post } from "@/types/types";
import { beforeEach, describe, it, expect } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import PostCard from "@/components/PostCard.vue";

import { postsResponse } from "../__tests__/mockPosts";

describe("PostCard", () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pinia = createTestingPinia();
  let wrapper = mount(PostCard);

  beforeEach(() => {
    wrapper = mount(PostCard, {
      props: {
        post: { ...postsResponse[0] } as Post,
        single: "",
      },
    });
  });

  it("Expect it to show the post title", () => {
    const text = `Post ${postsResponse[0].id}`;
    expect(wrapper.find(".post-card__title").text()).toContain(text);
  });

  it("Expect it to show two buttons", async () => {
    const buttons = await wrapper.findAll("button");
    expect(buttons.length).toBe(2);
  });

  it("snap shot matches", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Expect it to show 1 button if single is up", async () => {
    await wrapper.setProps({
      single: "up",
    });
    const buttons = await wrapper.findAll("button");
    expect(buttons.length).toBe(1);
    expect(buttons[0].classes()).toContain("up");
  });

  it("Expect it to show 1 button if single is down", async () => {
    await wrapper.setProps({
      single: "down",
    });
    const buttons = await wrapper.findAll("button");
    expect(buttons.length).toBe(1);
    expect(buttons[0].classes()).toContain("down");
  });
});
