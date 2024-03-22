import { createContext, useContext, useState } from "react";
import { ChildernsProps } from "../model/types/props";
import { ContentData } from "../model/types/content";
import { initContent } from "../model/initialization/content";

export const ContentContext = createContext<{
    data: ContentData;
    setData: React.Dispatch<React.SetStateAction<ContentData>>;
    updateBigSubject: (newBigSubject: any) => void;
    updateScript: (script: string) => void;
    updateMainSubject: (script: string) => void;
}>({
    data: initContent,
    setData: () => {},
    updateBigSubject: () => {},
    updateScript: () => {},
    updateMainSubject: () => {}
});

export const useContentContext = () => useContext(ContentContext);

export const ContentProvider: React.FC<ChildernsProps> = ({ children }) => {
    const [data, setData] = useState<ContentData>(initContent);

    const updateBigSubject = (newBigSubject: any) => {
        setData((prevData) => ({
            ...prevData,
            bigSubject: newBigSubject,
        }));
        console.log(data);
    };

    const updateMainSubject = (mainSubject: any) => {
        setData((prevData) => ({
            ...prevData,
            mainSubject: mainSubject,
        }));
        console.log(data);
    };

    const updateScript = (script: any) => {
        setData((prevData) => ({
            ...prevData,
            script: script,
        }));
        console.log(data);
    };

    return (
        <ContentContext.Provider value={{ data, setData, updateBigSubject, updateScript, updateMainSubject }}>
            {children}
        </ContentContext.Provider>
    );
};
