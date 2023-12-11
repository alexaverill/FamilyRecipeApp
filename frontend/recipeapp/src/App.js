import logo from './logo.svg';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import RecipeForm from './Components/RecipeForm/RecipeForm';
import { Route, Routes } from 'react-router-dom';
import Recipes from './Components/Recipes/Recipes';
import RecipeView from './Components/RecipeView/RecipeView';
function App() {
  return (
    <div className="App">
    <AppBar position="static">
    <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              minHeight:'2rem'
            }}
          >
            LOGO
          </Typography>
    </AppBar>
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
