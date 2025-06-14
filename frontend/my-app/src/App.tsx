import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="p-6">
      <nav className="space-x-4 mb-6">
        <Link to="/" className="text-blue-500">Home</Link>
        <Link to="/products" className="text-blue-500">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
