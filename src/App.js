import './App.css';
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header'
import Info from './components/info/Info';
import Album from './components/album/Album';
import Calendar from './components/calendar/Calendar';

function App() {
  return (
    <div className="App">
      {/* <HashRouter basename={process.env.PUBLIC_URL}> */}
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Info />} />
          <Route path="/album" element={<Album />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
