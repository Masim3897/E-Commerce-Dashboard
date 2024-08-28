import './App.css';
import Nav from './components/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/privateComponent';
import Login from './components/login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* add header or navbar */}
        <Nav />

        {/* defining the routes for every page */}
        <Routes>

          {/* ye sb productive route ha jb tk signup ni kry ga user
          tb tk in ma sa kisi page par ni ja sakta ha */}
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct/>} />
            <Route path='/logout' element={<h1>Logout components</h1>} />
            <Route path='/profile' element={<h1>Profile components</h1>} />
          </Route>

          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />


        </Routes>
      </BrowserRouter>

      {/* add footer  */}
      <Footer />
    </div>
  );
}

export default App;
