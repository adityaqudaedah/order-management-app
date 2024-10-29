import React from "react";
import CardContainer from "@/components/molecules/card-container";
import Footer from "@/components/molecules/footer";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="bg-custom-base-container h-screen p-24 flex flex-col justify-between space-y-6">
      <CardContainer>{children}</CardContainer>
      <Footer />
    </main>
  );
};

export default Container;
