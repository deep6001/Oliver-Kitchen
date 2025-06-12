import { useState } from 'react';
import './App.css'
import DealerForm from './pages/DealerForm'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import useCartStore from './Store/Cart';
import ProductList from './components/ProductList';
import { data } from './content/data';

 

function App() {

  const [userInfo, setuserInfo] = useState(localStorage.getItem('DealerInfo') ? JSON.parse(localStorage.getItem('DealerInfo')) : null);

  const handleOnsubmit = (data) => {
    console.log(data);
    localStorage.setItem('DealerInfo', JSON.stringify(data));
    setuserInfo(data);
  }
  const {selectedCategory,clearSelectedCategory}=useCartStore();

  const category= data.find((cat) => cat.category === selectedCategory); 

  return (
    <div className="App h-screen w-full bg-gray-50">
      <Routes>
        <Route path="/" element={userInfo ? <Home /> : <DealerForm onSubmit={handleOnsubmit} />} />
        

      </Routes>
    </div>
  )
}

export default App
