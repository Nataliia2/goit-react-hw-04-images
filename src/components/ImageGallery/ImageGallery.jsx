import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Dna  } from  'react-loader-spinner';
import fetchKey from '../Fetch';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import ImageList from '../ImagesList/ImageList';

export default function ImageGallery({ searchName }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [urlLarge, setUrlLarge] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
      setPage(1);
      setImages([]);
    }, [searchName]);

    useEffect(() => {
      if (!searchName) {
        setImages([]);
        return;
      }
        const fetchImages = async (currentName, currentPage) => {
          try {
            setLoading(true);
            const result = await fetchKey(currentName, currentPage);
            const items = result.hits;
            setImages(prevItems => {
              return [...prevItems, ...items];
            });
            if (items.length === 0) {
              return toast.warn(
                "Any images not found! Try again, please."
              );
            }
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
        fetchImages(searchName, page);
      }, [searchName, page]);
    
      
      const openModal = (urlLarge, title) => {
        setShowModal(true);
        setUrlLarge(urlLarge);
        setTitle(title);
      };
      

      const closeModal = () => {
        setShowModal(false);
        setUrlLarge('');
        setTitle('');
      };
    
      const loadMore = () => {
        setPage(state => state + 1);
      };

      const isImages = Boolean(images.length);

        
        return (
            <div>              
                {error && <p>Try later, please.</p>}
                {images && <ImageList items={images} onClick={openModal} />}    
                {isImages && <Button text="Load more..." onClick={loadMore} />}
                {loading && <Dna
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper" />}
                {showModal && <Modal onClose={closeModal} urlModalImg={urlLarge} titleModalImg={title} />}
            </div>
        );
                }