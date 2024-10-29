"use client";

import React, { Suspense } from "react";
import NavLink from "@/components/molecules/nav-link";
import SideBar from "@/components/molecules/side-bar";
import Container from "./container";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-6">
      {/* nav */}
      <div className="col-start-1 col-end-7">
        <NavLink />
      </div>
      {/* side-bar */}
      <div className="col-start-1 col-end-2">
        <SideBar />
      </div>

      {/* container */}
      <div className="col-start-2 col-end-7">
        {/* content */}
        <Container>
          <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
        </Container>
      </div>
      {/* container */}
    </div>
  );
};

export default PageLayout;
