import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header'
import Info from './components/info/Info';
import Album from './components/album/Album';
import Calendar from './components/calendar/Calendar';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path="/" element={<Info />} />
          <Route path="/album" element={<Album />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
