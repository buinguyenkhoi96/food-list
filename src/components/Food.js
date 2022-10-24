import PropTypes from 'prop-types';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGift, faPercent, fa1 } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';

const PROMOTIONS = {
  ONE_PLUS_ONE: '1+1',
  DISCOUNT: 'discount',
  GIFT: 'gift',
};

const Container = styled.div`
  width: 292px;
  height: 274px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 1px 1px 15px -1px rgba(0,0,0,0.25);
  position: relative;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 176px;
  background: url(${props => props.src});
  background-position: center;
  background-size: auto;
`;

const InformationContainer = styled.div`
  flex: 1;
  padding: 20px 18px;
`;

const FoodName = styled.p`
  font-weight: bold;
  font-size: 16px;
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 15px;
`;

const Tag = styled.div`
  padding: 9px 12px;
  border-radius: 12px;
  background: #f7f8fa;
  margin-right: 10px;
  max-width: 109px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  color: ${({ isNewTag }) => isNewTag ? '#4fc8a6' : 'inherit'};
  font-size: 14px;

  .food-tag-icon {
    padding-right: 5px;
  }
`;

const PromotionBadgeContainer = styled.div`
  position: absolute;
  left: -2;
  top: -2px;
  padding: 12px 22px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  background: ${({ backgroundColor }) => backgroundColor || 'inherit'};
`;

const Food = ({ thumbnaillUrl, name, isNew, rating, cookingTime, promotion, className }) => {
  const PromotionBadge = useCallback(() => {
    const ICON_MAP_BY_PROMOTION = {
      [PROMOTIONS.GIFT]: faGift,
      [PROMOTIONS.DISCOUNT]: faPercent,
      [PROMOTIONS.ONE_PLUS_ONE]: fa1,
    };
    const BADGE_BACKGROUND_COLOR_MAP_BY_PROMOTION = {
      [PROMOTIONS.GIFT]: '#00b1ff',
      [PROMOTIONS.DISCOUNT]: '#ff696f',
      [PROMOTIONS.ONE_PLUS_ONE]: '#8f64ff',
    };
    const iconMatchWithThisPromotion = ICON_MAP_BY_PROMOTION[promotion]

    if (!iconMatchWithThisPromotion) {
      return null;
    }

    return (
      <PromotionBadgeContainer className="promotion-badge" backgroundColor={BADGE_BACKGROUND_COLOR_MAP_BY_PROMOTION[promotion]}>
        <FontAwesomeIcon icon={iconMatchWithThisPromotion} />
      </PromotionBadgeContainer>
    )
  }, [promotion]);

  return (
    <Container className={className}>
      <Thumbnail className="food-thumbnail" src={thumbnaillUrl} />
      <InformationContainer className="food-information">
        <FoodName className="food-name">{name}</FoodName>
        <TagsContainer className="food-tag-container">
          <Tag className="food-tag rating-tag">
            <FontAwesomeIcon icon={faStar} className="food-tag-icon" />
            {rating}
          </Tag>
          <Tag className="food-tag cooking-time-tag" title={`${cookingTime} mins`}>
            {`${cookingTime} mins`}
          </Tag>
          {isNew && (
            <Tag isNewTag className="food-tag new-tag">
              New
            </Tag>
          )}
        </TagsContainer>
      </InformationContainer>
      <PromotionBadge />
    </Container>  
  );
};

Food.propTypes = {
  thumbnaillUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isNew: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  cookingTime: PropTypes.string.isRequired,
  promotion: PropTypes.oneOf([PROMOTIONS.GIFT, PROMOTIONS.ONE_PLUS_ONE, PROMOTIONS.DISCOUNT]),
  className: PropTypes.string,
};

Food.defaultProps = {
  className: undefined,
  promotion: undefined,
};

export default Food;
