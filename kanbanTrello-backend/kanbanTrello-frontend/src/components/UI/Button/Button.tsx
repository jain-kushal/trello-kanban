import React, { FunctionComponent } from "react";
import Button from "react-bootstrap/Button";

type ButtonProps = {
  clicked?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  btnType?: string;
};

const button: FunctionComponent<ButtonProps> = ({
  disabled,
  btnType,
  clicked,
  children,
}) => (
  <Button
    variant="info"
    onClick={clicked}
    disabled={disabled}
    type={btnType}
    block
  >
    {children}
  </Button>
);

export default button;
