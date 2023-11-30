import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchbarHeader,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputQueryChange = event => {
    setQuery(event.target.value);
  };

  const handleQueryFormSubmit = event => {
    event.preventDefault();

    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleQueryFormSubmit}>
        <SearchFormButton type="submit">
          <BiSearchAlt color="#252525" size="24" />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputQueryChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};
