/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Button } from "./Button";
import "./style.css";

export const ButtonWrapper = ({ className, buttonLabelText = "Label" }) => {
  return (
    <button className={`button-wrapper ${className}`}>
      <Button
        className="button-instance"
        labelText={buttonLabelText}
        labelTextClassName="design-component-instance-node"
        showIcon={false}
        stateProp="enabled"
        style="filled"
      />
    </button>
  );
};

ButtonWrapper.propTypes = {
  buttonLabelText: PropTypes.string,
};
