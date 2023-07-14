import styled from "styled-components";
import PropTypes from "prop-types";

export const Form = styled.form`
  display: inline-flex;
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 0.625rem;
  background: #fff;
  box-shadow: 10px 10px 10px 0px rgba(82, 129, 220, 0.25);
  min-width: 320px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
`;

export const InputGroup = styled.div`
  display: flex;
  padding: 0.625rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
`;

export const Button = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.3125rem;
  background: ${({ $outlined }) => {
    return $outlined ? "transparent" : "rgba(82, 129, 220, 1)";
  }};
  border: ${({ $outlined }) => {
    return !$outlined ? 0 : "1px solid rgba(82, 129, 220, 1)";
  }};

  color: ${({ $outlined }) => {
    return !$outlined ? "#EFEFEF" : "rgba(82, 129, 220, 1)";
  }};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  opacity: ${({ $active }) => {
    return $active ? 1 : 0.5;
  }};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

Button.propTypes = {
  $outlined: PropTypes.bool,
};

export const Action = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const Title = styled.legend`
  color: #5281dc;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const SubTitle = styled.p`
  color: rgba(105, 105, 105, 0.93);
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const EsqueciSenha = styled.a`
  color: #666;
  font-family: Segoe UI;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
