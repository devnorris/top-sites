import { BrowserRouter } from 'react-router-dom';
import NavBar from './Components/NavBar';

import Routes from './Routes';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
