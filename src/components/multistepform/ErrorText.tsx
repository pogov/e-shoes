import React from "react";

const ErrorText: React.FC = ({ children }) => {
  return <div style={{ fontSize: ".75em", color: "red" }}>{children}</div>;
};

export default ErrorText;
