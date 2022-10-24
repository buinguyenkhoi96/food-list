import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 344px;
  color: #c0c3c9;
  border: 1px solid #f0f1f3;
  background: #FFFFFF;
  padding: 16px 0;
  border-radius: 20px;

  .search-icon {
    padding-left: 20px;
    padding-right: 10px;
    color: inherit;
  }

  .search-input {
    border: 0;
    height: 100%;
    flex: 1;
    font-size: 17px;
    color: #000000;

    &:focus {
      outline: none;
    }
  }
`;

const SearchBar = ({
  onChange,
  value,
  className,
}) => {
  return (
    <InputWrapper className={className}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
      <input value={value} onChange={onChange} className="search-input" placeholder="Enter restaurant name..." />
    </InputWrapper>
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.any,
};

SearchBar.defaultProps = {
  className: undefined,
};

export default SearchBar;