import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { ThemeProvider } from '@mui/material';
import { theme } from './shared/utils/theme';
import HomePage from './pages/Home.page';
import SigninPage from './pages/Signin.page';
import RegisterPage from './pages/Register.page';
import PrivateRoute from './features/auth/components/PrivateRoute';
import { store } from './store'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute page={<HomePage/>}/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/signin' element={<SigninPage/>}/>
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
//Cypress
type CypressWindow = Window & typeof globalThis & { Cypress: any, store: any}

const thisWindow = window as CypressWindow;

if(thisWindow.Cypress) {
  console.log('CYPRESS WINDOW')
  thisWindow.Cypress.store = store;
}

export default App;
