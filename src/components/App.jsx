import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { Container } from './Container/Container.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImageGallery, PER_PAGE } from 'api/fetchImageGallery';
import { LoadMoreButton } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonHidden, setIsButtonHidden] = useState(true);

  useEffect(() => {
    if (query !== '') {
      processImageGallery(query, page);
    }
  }, [query, page]);

  const processImageGallery = async (query, page) => {
    try {
      setIsLoading(true);

      const { hits, totalHits } = await fetchImageGallery(query, page);

      setImages(prevImages => [...prevImages, ...hits]);
      setIsButtonHidden(false);

      if (page * PER_PAGE > totalHits) {
        setIsButtonHidden(true);
      }
    } catch (error) {
      Notify.failure(`Failure: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQueryFormSubmit = query => {
    if (query.trim() === '') {
      Notify.warning('You should enter your search query');
      return;
    }

    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleQueryFormSubmit} />
      {Boolean(images.length) && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {!isButtonHidden && !isLoading && (
        <LoadMoreButton onClick={handleLoadMoreBtnClick} />
      )}
    </Container>
  );
};
