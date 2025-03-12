import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { useMediaQuery } from 'react-responsive';

import Header from './components/header/Header'
import Info from './components/info/Info';
import Album from './components/album/Album';
import Calendar from './components/calendar/Calendar';

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:768px)"
  });

  return <>{isMobile && children}</>
}

export const PC = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(min-width:769px)"
  });

  return <>{isPc && children}</>
}

function App() {
  const [count, setCount] = useState(0)

  return (    
    // <body bgcolor="#F4F4F2">
    // <Header>
      <BrowserRouter>
      <Header/>
      <Routes>
            <Route path="/" element={<Info />} />
            <Route path="/album" element={<Album />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>

      </BrowserRouter>
    // </body>
    
    //     <div>
    // <li>test</li>
    //     </div>

    //     <Header></Header>
    // <>
    // <Header></Header>
    //   <div>

    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App
