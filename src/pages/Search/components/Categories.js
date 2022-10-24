import PropTypes from 'prop-types';
import styled, { css } from "styled-components";

const CategoriesContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  border: 2px solid #ffdf78;
  border-radius: 15px;
  overflow: hidden;
`;

const Category = styled.p`
  margin: 0;
  color: #747b83;
  border-right: 1px solid #ffdf78;
  padding: 15px 26px;
  cursor: pointer;

  ${({ isSelected }) => !isSelected
    ? css`
      background: 'transparent';
    `
    : css`
      background: #ffdf78;
      font-weight: bold;
    `};

  &:last-child {
    border-right: 0;
  }
`;




const Categories = ({ categories, onSelect, selectedCategories, className }) => {
  const renderCategory = (category) => {
    const { name, id } = category;

    return (
      <Category className="category" key={id} isSelected={selectedCategories.includes(id)} onClick={() => onSelect(id)}>
        {name}
      </Category>
    );
  };

  return (
    <CategoriesContainer className={className}>
      {categories.map(renderCategory)}
    </CategoriesContainer>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default Categories;