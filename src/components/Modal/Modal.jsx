import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { CloseButton, ModalContainer, Overlay } from './Modal.styled';

const ESC = 'Escape';

export const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyClose);

    return () => window.removeEventListener('keydown', handleKeyClose);
  });

  const handleKeyClose = event => {
    if (event.code !== ESC) {
      return;
    }

    onClose();
  };

  return (
    <>
      <ModalContainer>
        <CloseButton type="button" onClick={onClose}>
          <IoClose color="#252525" size="24" />
        </CloseButton>
        <img src={largeImageURL} alt={tags} width="750" />
      </ModalContainer>
      <Overlay onClick={onClose} />
    </>
  );
};
