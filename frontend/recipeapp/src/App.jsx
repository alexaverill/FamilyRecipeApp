import logo from "./logo.svg";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import RecipeForm from "./Components/RecipeForm/RecipeForm";
import { Route, Routes } from "react-router-dom";
import Recipes from "./Components/Recipes/Recipes";
import RecipeView from "./Components/RecipeView/RecipeView";
import NavBar from "./Components/Navbar/Navbar";
import Collections from "./Components/Collections/Collections";
import CollectionsView from "./Components/CollectionView/CollectionView";
import Login from "./Components/Login/Login";
import {
  UserContext,
  UserContextProvider,
} from "./Components/UserContext/UserContext";
import AuthRoute from "./Components/AuthRoute/AuthRoute";
import { useContext } from "react";
import { CircularProgress } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import FavoriteView from "./Components/FavoriteView/FavoriteView";
import Cookbook from "./Components/Cookbook/Cookbook";
import CollectionPage from "./Components/CollectionPage/CollectionPage";
import { Import } from "./Components/Import/Import";
const theme = createTheme({
  palette: {
    primary: {
      light: "#ee95af",
      main: "#dd3f64",
      dark: "#b6365b",
      contrastText: "#fff",
    },
  },
});
function App() {
  const { isLoading } = useContext(UserContext);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <NavBar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <AuthRoute>
                      <Cookbook />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/recipes"
                  element={
                    <AuthRoute>
                      <Recipes />
                    </AuthRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/create"
                  element={
                    <AuthRoute>
                      <RecipeForm />
                    </AuthRoute>
                  }
                />
                <Route path="/import" element={<Import />} />
                <Route
                  path="/favorites"
                  element={
                    <AuthRoute>
                      <FavoriteView />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/collections"
                  element={
                    <AuthRoute>
                      <CollectionPage />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/collections/:collectionId"
                  element={
                    <AuthRoute>
                      <CollectionsView />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/recipe/:recipeId/edit"
                  element={
                    <AuthRoute>
                      <RecipeForm />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/recipe/:recipeId"
                  element={
                    <AuthRoute>
                      <RecipeView />
                    </AuthRoute>
                  }
                />
              </Routes>
            </>
          )}
        </UserContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
