import { parseRecipe } from "../utilities/parseRecipe";
test("It parses a simple input", () => {
  let simpleRecipe = `1 egg 
    1 cheese
    @@@
    Cook Egg
    Add Cheese`;
  let result = parseRecipe(simpleRecipe);
  expect(result.ingredients.length).toBe(2);
  expect(result.steps.length).toBe(2);
});

test("It returns an error when there is no seperator", () => {
  let simpleRecipe = `1 egg 
    1 cheese
    Cook Egg
    Add Cheese`;
  let result = parseRecipe(simpleRecipe);
  expect(result.error).toBe(true);
  expect(result.message).toBe("Missing Seperator");
});
test("It returns an error when there are no ingredients", () => {
  let simpleRecipe = `@@@
    Cook Egg
    Add Cheese`;
  let result = parseRecipe(simpleRecipe);
  expect(result.error).toBe(true);
  expect(result.message).toBe("Missing Ingredients");
});
test("It returns an error when there are no steps", () => {
  let simpleRecipe = `1 egg 
    1 cheese
    @@@`;
  let result = parseRecipe(simpleRecipe);
  expect(result.error).toBe(true);
  expect(result.message).toBe("Missing Steps");
});
