import React from "react";
import { Link } from "react-router-dom";

function FormBottomInfo({ content, buttonText, buttonLink }) {
  return (
    <div className="text-center mt-3 text-sm text-gray-600">
      {content} <Link to={buttonLink} className="text-blue-700 underline">{buttonText}</Link>
    </div>
  );
}

export default FormBottomInfo;
