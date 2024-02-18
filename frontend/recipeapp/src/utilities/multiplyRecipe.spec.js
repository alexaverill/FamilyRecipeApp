import multiply_recipe from './multiplyRecipe';

describe("Multiple Recipe Tests",()=>{
    // [input, multiplier,expected]
    let tests = [
        ["2 tsp",2,"4 tsp"],
        ["2.5 tsp",2,"5 tsp"],
        ["2.55 tsp",2,"5.1 tsp"],
        ["2.555 tsp",2,"5.11 tsp"],
        ["2 1/2 tsp", 2, "5 tsp"],
        ['3 1/3 tsp',2,'6 2/3 tsp'],
        ['3 5/8 tsp',2,'7 1/4 tsp'],
        ['3 5/8tsp',2,'7 1/4tsp'],
        ["2 tsp",10,"20 tsp"],
        ["2 tsp",.5,"1 tsp"],
        ["1/2 tsp",2,"1 tsp"]
    ]
    it.each(tests)("doubles the input",(input,multiple,expected)=>{
        let output = multiply_recipe(input,multiple);
        expect(output).toBe(expected);
    });

});