import React from "react";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import { ChildrenProp } from "../interfaces/ChildrenProp";

const MainTemplate: React.FC<ChildrenProp> = ({ children }) => (
  <>
    <NavBar />
    {children}
    <Footer />
  </>
);

export default MainTemplate;
