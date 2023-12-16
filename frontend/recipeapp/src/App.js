import logo from './logo.svg';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import RecipeForm from './Components/RecipeForm/RecipeForm';
import { Route, Routes } from 'react-router-dom';
import Recipes from './Components/Recipes/Recipes';
import RecipeView from './Components/RecipeView/RecipeView';
import NavBar from './Components/Navbar/Navbar';
import Collections from './Components/Collections/Collections';
import CollectionsView from './Components/CollectionView/CollectionView';
import Login from './Components/Login/Login';
import { UserContextProvider } from './Components/UserContext/UserContext';
import AuthRoute from './Components/AuthRoute/AuthRoute';
function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={
            <AuthRoute>
              <Recipes />
            </AuthRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<AuthRoute><RecipeForm /></AuthRoute>} />
          <Route path="/collections" element={<AuthRoute><Collections /></AuthRoute>} />
          <Route path="/collections/:collectionId" element={<AuthRoute><CollectionsView /></AuthRoute>} />
          <Route path="/recipe/:recipeId/edit" element={<AuthRoute><RecipeForm /></AuthRoute>} />
          <Route path="/recipe/:recipeId" element={<AuthRoute><RecipeView /></AuthRoute>} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
