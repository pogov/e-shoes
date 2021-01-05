import React from "react";
import { ChildrenProp } from "../interfaces/ChildrenProp";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";

const MainTemplate: React.FC<ChildrenProp> = ({ children }) => (
  <>
    <NavBar />
    {children}
    <Footer />
  </>
);

export default MainTemplate;
