import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import AnimatedCursor from './components/AnimatedCursor';

function App() {
  return (
    <>
      <AnimatedCursor />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
