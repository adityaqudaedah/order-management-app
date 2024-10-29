import React from "react";

const CardContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-lg h-custom-height-card-container overflow-auto">
      {children}
    </div>
  );
};

export default CardContainer;
