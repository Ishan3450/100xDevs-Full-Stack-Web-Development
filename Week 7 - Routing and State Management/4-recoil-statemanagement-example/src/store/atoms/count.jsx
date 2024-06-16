import { atom, selector } from "recoil";

export const countAtom = atom({
  key: "countAtom",
  default: 0,
});

export const evenSelector = selector({
  key: "evenSelector",
  get: ({ get }) => {
    // {get} from props named object
    const count = get(countAtom); // here passing countAtom in the get() method is same as passing countAtom in a dependency list, which means evenSelector is dependent of the countAtom now and each time countAtom changes, evenSelector will run again
    return (count & 1) == 0;
  },
});
