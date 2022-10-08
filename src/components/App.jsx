import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Search from './Searchbar/Searchbar';


export function App() {
  const [searchName, setSearchName] = useState('');
 
  const handleSubmitSearchForm = searchName => {
    setSearchName(searchName);

  }

    return (
      <div className="App">
        <Search onSubmit={handleSubmitSearchForm} />
        <ImageGallery searchName={searchName} />
        <ToastContainer autoClose={3000} />
      </div>
  );
  }
    
