import { atomFamily } from "recoil";

// here hardcoded todos are there
const TODOS = [
  {
    id: 1,
    title: "Hallie Franklin",
    description: "1742 Kovul Road",
  },
  {
    id: 2,
    title: "Lora Bowers",
    description: "179 Tafew Junction",
  },
];


// atom family lets you create dynamic atoms for every element here in our case it will create unique atom for each id but if same id is passed then it will not duplicate it instead just return the previous with the same id one
// * used when we want to create dynamic value based atoms
export const todosFamily = atomFamily({
  key: "todosFamily",
  default: (id) => {
    return TODOS.find(task => task.id == id);
  },
});
