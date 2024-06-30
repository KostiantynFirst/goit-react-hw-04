// import { Overlay, ModalStyled, ModalImage } from './ImageModal.styled';
import css from './ImageModal.module.css'
import Modal from 'react-modal'

export default function ImageModal ({ selectedImage, tags, isOpen, onRequestClose }) {


return (
  
  <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={css.ModalContainer} overlayClassName={css.Overlay}>
    <div className={css.ModalStyled}>
      <img className={css.ModalImage}  src={selectedImage} alt={tags}/>
        </div>
  </Modal>
  );
}