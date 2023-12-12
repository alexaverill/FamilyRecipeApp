import logo from './logo.svg';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import RecipeForm from './Components/RecipeForm/RecipeForm';
import { Route, Routes } from 'react-router-dom';
import Recipes from './Components/Recipes/Recipes';
import RecipeView from './Components/RecipeView/RecipeView';
import NavBar from './Components/Navbar/Navbar';
function App() {
  return (
    <div className="App">
    <NavBar/>
    <Routes>
            <Route path="/" element={<Recipes/>}/>
            <Route path="/create" element={<RecipeForm/>}/>
            <Route path="/recipe/:recipeId/edit" element={<RecipeForm/>}/>
            <Route path="/recipe/:recipeId" element={<RecipeView/>}/>
    </Routes>
    </div>
  );
}

export default App;
