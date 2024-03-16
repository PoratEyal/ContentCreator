import React from "react";
import { ContentProvider } from "./ContentContext";
import { ChildernsProps } from "../model/types/props";

const Providers: React.FC<ChildernsProps> = ({ children }) => {
    return <ContentProvider>{children}</ContentProvider>;
};

export default Providers;
