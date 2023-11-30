import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';

import {
  ImageGalleryItemContainer,
  ImageGalleryItemSource,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalHidden, setIsModalHidden] = useState(true);

  const handleOpenImageModal = () => {
    setIsModalHidden(false);
  };

  const handleCloseImageModal = () => {
    setIsModalHidden(true);
  };

  return (
    <>
      <ImageGalleryItemContainer onClick={handleOpenImageModal}>
        <ImageGalleryItemSource src={webformatURL} alt={tags} />
      </ImageGalleryItemContainer>
      {!isModalHidden && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={handleCloseImageModal}
        />
      )}
    </>
  );
};
