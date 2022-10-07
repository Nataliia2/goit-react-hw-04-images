import { useState, useEffect, useRef } from 'react';
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

    const prevPage = usePrevious(page);
    const prevSearchName = usePrevious(searchName);
    
    
    useEffect(() => {

        const fetchImages = async (currentName, currentPage) => {
            setLoading(true);
            try {
                const result = await fetchKey(currentName, currentPage);
                const items = result.hits;
                if (items.length === 0) {
                    return toast.warn("Any images not found! Try again, please.");
                }
                if (currentPage === 1) {
                    setImages([...items]);
                } else {
                    setImages(prev => [...prev, ...items]);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (!searchName) {
            return;
        }       
        if (page > prevPage) {
            fetchImages(searchName, page);
            return;
        }
        if ((prevSearchName !== searchName) && page === prevPage) {
            fetchImages(searchName, 1);
            resetPage();
            return;
        }
        
    }, [searchName, page, prevPage, prevSearchName]);

   
    const resetPage = () => {
        setPage(1);
    }

    const openModal = (urlLarge, title) => {
        setShowModal(true);
        setUrlLarge(urlLarge);
        setTitle(title);
    }
    const closeModal = () => {
        setShowModal(false);
        setUrlLarge('');
        setTitle('');
    }

    const loadMore = () => {
        setPage((prev) => prev + 1);
    }

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const isImages = Boolean(images.length);
        return (
            <div>              
                {error && <p className="notification">Try later, please.</p>}
                {images && <ImageList items={images} onClick={openModal} />}    
                {isImages && <Button text="Load more..." onClick={loadMore} />}
                {loading && <Dna
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper" />}
                {showModal && <Modal onClose={closeModal} urlModalImg={urlLarge} dscModalImg={title} />}
            </div>
        )
    }
   
        