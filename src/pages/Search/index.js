import { useEffect, useState } from "react";
import styled from "styled-components";

import SearchBar from "@source/pages/Search/components/Searchbar";
import Categories from "@source/pages/Search/components/Categories";

import PageContainer from "@source/components/PageContainer";
import Food from "@source/components/Food";

import FoodServices from "@source/services/Food";
import Logger from "@source/services/Logger";


const StyledCategories = styled(Categories)`
  margin-top: 40px;
`;

const FoodContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 63px;
`;

const StyledFood = styled(Food)`
  margin-bottom: 25px;
`;

const StyledSearchBar = styled(SearchBar)`
  margin-top: 25px;
`;

const roundNumberAtTwoDecimals = (number) => Math.round(number * 10) / 10;

const Search = () => {
  const [searchingText, setSearchingText] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
  const [foods, setFoods] = useState([]);

  console.log(foods);

  const handleInputChanged = ({ target: { value } }) => {
    setSearchingText(value);
  };

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
      } catch (exception) {
        Logger.log(exception);
      }
    };

    initData();
  }, []);

  return (
    <PageContainer>
      <StyledSearchBar value={searchingText} onChange={handleInputChanged} />
      <StyledCategories categories={categories} selectedCategories={selectedCategoriesIds} onSelect={handleCategorySelected} />
      <FoodContainer>
        {foods.map(({ id, imageUrl, name, isNew, rating, minCookTime, maxCookTime, promotion }) => (
          <StyledFood
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
    </PageContainer>
  );
};

export default Search;
