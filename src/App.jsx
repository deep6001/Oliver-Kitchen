import { useState } from 'react';
import './App.css'
import DealerForm from './pages/DealerForm'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';

function App() {

  const [userInfo, setuserInfo] = useState(localStorage.getItem('DealerInfo') ? JSON.parse(localStorage.getItem('DealerInfo')) : null);

  const handleOnsubmit = (data) => {
    console.log(data);
    localStorage.setItem('DealerInfo', JSON.stringify(data));
    setuserInfo(data);
  }

  return (
    <div className="App h-screen w-full bg-gray-50">
      <Routes>
        <Route path="/" element={userInfo ? <Home /> : <DealerForm onSubmit={handleOnsubmit} />} />


      </Routes>
    </div>
  )
}

export default App
