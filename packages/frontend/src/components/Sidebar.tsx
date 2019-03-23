import * as React from "react";
import CategoryMenu from "./CategoryMenu";
import Footer from "./Footer";
import SelectSort from "./SelectSort";

const Sidebar: React.FC = () => (
  <div className="sidebar-menu">
    <CategoryMenu />
    <SelectSort />
    <Footer />
  </div>
);

export default Sidebar;
