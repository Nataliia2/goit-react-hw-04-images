import { useEffect } from "react";
import { createPortal } from 'react-dom';
import { Overlay, Modals, ModalImg } from './Modal.style';

const modalRoot = document.getElementById('root');

export default function Modal({ onClose, imageUrlLarge, imageTitle }) {
  
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    }
  })
  
    const closeModal = (event) => {
      if (event.code === "Escape" || event.target === event.currentTarget) {
        onClose();
      }
    }
  
        return createPortal(
        <Overlay  onClick={closeModal}>
                  <Modals>
              <ModalImg src={imageUrlLarge} alt={imageTitle} />
                  </Modals>
              </Overlay>,
        modalRoot
      )
    }