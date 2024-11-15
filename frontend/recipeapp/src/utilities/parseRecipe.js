export function parseRecipe(strings) {
  let entries = strings.split("@@@");
  if (entries.length < 2) {
    return { error: true, message: "Missing Seperator" };
  }
  let ingredients = cleanArray(entries[0].split(/\r?\n/));
  if (ingredients.length <= 0) {
    return { error: true, message: "Missing Ingredients" };
  }
  let steps = cleanArray(entries[1].split(/\r?\n/));
  if (steps.length <= 0) {
    return { error: true, message: "Missing Steps" };
  }
  let returnObj = { error: false, ingredients, steps };

  return returnObj;
}
function cleanArray(array) {
  let cleanedArray = [];
  for (let entry of array) {
    entry = entry.trim();
    if (entry.length > 0) {
      cleanedArray.push(entry);
    }
  }
  return cleanedArray;
}
