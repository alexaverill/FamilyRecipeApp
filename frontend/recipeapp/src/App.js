import logo from './logo.svg';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import RecipeForm from './Components/RecipeForm/RecipeForm';
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
    <RecipeForm/>
    </div>
  );
}

export default App;
