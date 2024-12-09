import { CircularProgress, TextField, Autocomplete, Box } from "@mui/material";
export default function AutoCompleteRecipeList({ recipes, onSelected }) {
  return (
    <Autocomplete
      id="recipe-search"
      size="small"
      sx={{ width: 300 }}
      options={recipes}
      autoHighlight
      getOptionLabel={(option) => option.title}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          let title = event.target.value;
          let recipe = recipes.find((recipe) => recipe.title === title);
          onSelected(recipe);
          //   if (recipe) {
          //     navigate(`/recipe/${recipe.recipeId}`);
          //   }
        }
      }}
      onChange={(event, value) => {
        if (value?.recipeId) {
          let recipe = recipes.find(
            (recipe) => recipe.recipeId === value.recipeId
          );
          onSelected(recipe);
          // navigate(`/recipe/${value.recipeId}`);
        }
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.title}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label="Search for a Recipe"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
