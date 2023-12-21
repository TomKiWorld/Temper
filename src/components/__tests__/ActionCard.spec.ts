import { mount } from "@vue/test-utils";
import type { Action } from "@/types/types";
import { describe, it, expect } from "vitest";
import ActionCard from "@/components/ActionCard.vue";

describe("ActionCard", () => {
  const actionData: Action = {
    id: 1,
    index: 1,
    newIndex: 2,
  };
  const wrapper = mount(ActionCard, {
    propsData: {
      action: actionData,
    },
  });

  it("Expect it to show the action", () => {
    const text = `Moved post ${actionData.id} from index ${actionData.index} to index ${actionData.newIndex}`;
    expect(wrapper.find(".action-card__title").html()).toContain(text);
  });

  it("Emits undo on button click", async () => {
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted().undo).toBeTruthy();
    expect(wrapper.emitted().undo.length).toBe(1);
  });

  it("snap shot matches", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
