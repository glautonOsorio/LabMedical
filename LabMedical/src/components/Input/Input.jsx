import PropTypes from "prop-types";
import { useState } from "react";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import * as Styled from "./Input.style";

export const InputComponent = ({
  label,
  type,
  id,
  placeholder,
  register,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Styled.InputGroup>
      <Styled.Label $color={error && "danger"} htmlFor={id}>
        {label}
      </Styled.Label>

      {type !== "textarea" && (
        <Styled.InputContainer>
          <Styled.Input
            $color={error && "danger"}
            type={showPassword ? "text" : type}
            id={id}
            placeholder={placeholder}
            {...register}
          />
          {type === "password" && (
            <Styled.Icon
              $color={error && "danger"}
              type="button"
              onClick={handleShowPassword}
            >
              {!showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </Styled.Icon>
          )}
        </Styled.InputContainer>
      )}

      {type === "textarea" && (
        <Styled.TextArea
          $color={error && "danger"}
          id={id}
          placeholder={placeholder}
          {...register}
        />
      )}
    </Styled.InputGroup>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.any,
  error: PropTypes.any,
};
