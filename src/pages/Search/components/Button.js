import PropTypes from 'prop-types';
import styled from "styled-components";

const Container = styled.button`
  padding: 17px 30px;
  border: 2px solid #ffdf78;
  border-radius: 12px;
  display: inline-block;
  cursor: pointer;
  background: #FFFFFF;

  &:active {
    opacity: 0.5;
    background: #ffdf78;
    color: #FFFFFF;
  }
`;

const Button = ({ children, onClick }) => (
  <Container onClick={onClick}>
    {children}
  </Container>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
