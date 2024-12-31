import { atomFamily, selectorFamily } from "recoil";

// selectorFamily lets you create dynamic selectors whose default value is based on some asynchronous operation like a backend call
export const todosSelectorFamily = atomFamily({
  key: "todosSelectorFamily",
  default: selectorFamily({
    key: "getTodosSelector",
    // the get is the hardest part to grasp
    // * get is a function taking id as input param and returns an async function where the async operation will be performed
    // if same id is passed then no duplicate network calls will be there, the previous with the same id will be cached somewhere
    get: function (id) {
      return async function ({ get }) {
        const response = await fetch(`https://sum-server.100xdevs.com/todo?id=${id}`);
        const parsed = await response.json();
        return parsed.todo;
      };
    },
  }),
});
