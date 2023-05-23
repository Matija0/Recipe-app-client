import './App.css';
import {Routes, Route} from "react-router-dom"

import SavedRecipes from './pages/SavedRecipes';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';


function App() {
  return (
    <div className="App">
        <div className=' w-1/4 '><Navbar/></div>
        <div className=' w-1/2'>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/createrecipe' element={<CreateRecipe/>} />
          <Route exact path='/savedrecipes' element={<SavedRecipes/>}/>
        </Routes> 
        </div>
        <div className='w-1/4 bg-white'>

        </div>
    </div>
  );
}

export default App;
