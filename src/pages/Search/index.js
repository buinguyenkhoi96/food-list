import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import SearchBar from "@source/pages/Search/components/Searchbar";
import Categories from "@source/pages/Search/components/Categories";
import Button from "@source/pages/Search/components/Button";

import PageContainer from "@source/components/PageContainer";
import Food from "@source/components/Food";

import FoodServices from "@source/services/Food";
import Logger from "@source/services/Logger";

const StyledSearchBar = styled(SearchBar)`
  margin-top: 25px;
`;

const StyledCategories = styled(Categories)`
  margin-top: 40px;
`;

const FoodContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(292px,1fr));
  gap: 25px;
  margin-top: 63px;
`;

const ShowMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 47px;
  padding-bottom: 25px;
`;

const NUMBER_OF_ITEM_PER_PAGE = 10;
const DEBOUNCE_THRESHOLD = 300; // Miliseconds

const roundNumberAtTwoDecimals = (number) => Math.round(number * 10) / 10;

const Search = () => {
  const [searchingText, setSearchingText] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const timerRef = useRef();
  const isTheLastPage = pageIndex * NUMBER_OF_ITEM_PER_PAGE >= foods?.length;

  const handleInputChanged = ({ target: { value } }) => {
    setSearchingText(value);
  };

  const filterFoods = useCallback(() => {
    const filterFoodBySearchKeyword = (_foods) => {
      if (!searchingText) {
        return _foods;
      }

      return _foods.filter(({ name }) => name.includes(searchingText));
    };
    const filterFoodByCategories = (_foods) => {
      if (selectedCategoriesIds?.length === 0) {
        return _foods;
      }

      return _foods.filter(({ categoryId }) => selectedCategoriesIds.includes(categoryId));
    };
    const pagingFoodFromFilterResult = (_foods) => {
      if (searchingText || selectedCategoriesIds?.length > 0) {
        return _foods;
      }

      return _foods?.slice(0, pageIndex * NUMBER_OF_ITEM_PER_PAGE)
    };

    setFilteredFoods(
      pagingFoodFromFilterResult(
        filterFoodByCategories(
          filterFoodBySearchKeyword(foods)
        )
      )
    );
  }, [searchingText, foods, selectedCategoriesIds, pageIndex]);

  const handleCategorySelected = (categoryId) => {
    if (selectedCategoriesIds.includes(categoryId)) {
      setSelectedCategoriesIds(selectedCategoriesIds.filter(selectedCategoryId => selectedCategoryId !== categoryId));
    } else {
      setSelectedCategoriesIds(selectedCategoriesIds.concat(categoryId));
    }
  }

  useEffect(() => {
    const initData = async () => {
      try {
        const categoriesResponse = await FoodServices.getFoodCategories();
        setCategories(categoriesResponse);

        const foodsResponse = await FoodServices.getFoodList();
        setFoods(foodsResponse);

        Logger.log(foodsResponse);
      } catch (exception) {
        Logger.warn(exception);
      }
    };

    initData();
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => filterFoods(), DEBOUNCE_THRESHOLD);
  }, [filterFoods]);

  return (
    <PageContainer>
      <StyledSearchBar value={searchingText} onChange={handleInputChanged} />
      <StyledCategories categories={categories} selectedCategories={selectedCategoriesIds} onSelect={handleCategorySelected} />
      <FoodContainer>
        {filteredFoods.map(({ id, imageUrl, name, isNew, rating, minCookTime, maxCookTime, promotion }) => (
          <Food
            key={id}
            name={name}
            thumbnaillUrl={imageUrl}
            isNew={isNew}
            rating={roundNumberAtTwoDecimals(rating)}
            cookingTime={`${minCookTime} - ${maxCookTime}`}
            promotion={promotion}
          />
        ))}
      </FoodContainer>
      {<ShowMoreButtonContainer>
        {!isTheLastPage && (
          <Button onClick={() => setPageIndex(pageIndex + 1)}>
            <FontAwesomeIcon icon={faPlus} /> Show more
          </Button>
        )}
      </ShowMoreButtonContainer>}
    </PageContainer>
  );
};

export default Search;
