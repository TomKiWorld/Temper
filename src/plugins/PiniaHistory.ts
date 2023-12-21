import type { PiniaHistory } from "@/types/types";
import type { PiniaPluginContext } from "pinia";
import { reactive, ref } from "vue";

export function PiniaHistory({ store }: PiniaPluginContext) {
  const history: string[] = reactive([]);
  const future: string[] = reactive([]);
  const doingHistory = ref(false);
  history.push(JSON.stringify(store.$state));
  store.$subscribe((mutation, state) => {
    if (!doingHistory.value) {
      history.push(JSON.stringify(state));
      future.splice(0, future.length);
    }
  });

  return {
    undo: () => {
      if (history.length <= 1) return;
      doingHistory.value = true;
      future.push(history.pop() || "");
      store.$state = JSON.parse(history.at(-1) || "");
      doingHistory.value = false;
    },
    redo: () => {
      const latestState = future.pop();
      if (!latestState) return;
      doingHistory.value = true;
      history.push(latestState);
      store.$state = JSON.parse(history.at(-1) || "");
      doingHistory.value = false;
    },
    history,
    future,
  } as PiniaHistory;
}
