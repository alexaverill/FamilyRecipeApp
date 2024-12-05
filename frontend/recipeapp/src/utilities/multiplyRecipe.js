import Fraction from "fraction.js";
//take in a string that has a ingredient value, then multiple the numeric portion by the multiple and return the new ingredient string.
export function multiply_recipe(input_string, multiple) {
  let val = input_string;
  let values = input_string.matchAll(/\d+(\.\d+|\s+\d+\/\d+)?/gim);
  let replacements = [];
  for (let arr of values) {
    let simpleFraction = arr.input.match(/(^|\D{2})\d\/\d?/gim);
    if (simpleFraction?.length > 0) {
      let split = simpleFraction[0].split("/");
      let float = split[0] / split[1];
      float *= multiple;
      let frac = new Fraction(float);
      replacements.push({
        original: simpleFraction,
        replacement: frac.toFraction(true).toString(),
      });
    } else if (arr[0].includes("/")) {
      let fractionValues = arr[1].trim();
      let splitFraction = fractionValues.split("/");
      let floatVal = splitFraction[0] / splitFraction[1];
      let nonFraction = arr[0].replace(fractionValues, "").trim();
      nonFraction *= multiple;
      floatVal *= multiple;
      let final = nonFraction + floatVal;
      let frac = new Fraction(final);
      replacements.push({
        original: arr[0],
        replacement: frac.toFraction(true).toString(),
      });
    } else {
      replacements.push({
        original: arr[0],
        replacement: parseFloat(arr[0]) * multiple,
      });
    }
  }
  if (replacements.length <= 0) {
    return input_string;
  }
  for (let change of replacements) {
    val = val.replace(change.original, change.replacement);
  }
  return val;
}
