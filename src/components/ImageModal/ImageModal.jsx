import React, { useEffect } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled } from './ImageModal.styled';
import Loader from '../Loader/Loader';

const modalRoot = document.querySelector('#modal-root');

export default function ImageModal ({ selectedImage, tags, onClose }) {

const [isLoading, setIsLoading] = useState(true)

useEffect (() => {
  const image = new Image();
  image.src = selectedImage;
  image.onload = () => {
    setIsLoading(false);
  };

  return () => {
    setIsLoading(true);
  }

}, [selectedImage])


useEffect(() => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    
}, [onClose])


  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

return createPortal(
    <Overlay onClick={handleBackdropClick} >
      {isLoading ? (
        <Loader /> // Show the spinner while the image is loading
      ) : (
        <ModalStyled>
          <img src={selectedImage} alt={tags} />
        </ModalStyled>
      )}
    </Overlay>,
    modalRoot
  );
}