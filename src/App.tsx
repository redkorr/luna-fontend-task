import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
// import { ModeToggle } from './components/ModeToggle';
import { ThemeProvider } from './components/theme-provider';
import { ROUTES } from './routes';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Router>
        <Routes>
          {ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
