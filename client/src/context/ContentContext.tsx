import { createContext, useContext, useState } from "react";
import { ChildernsProps } from "../model/types/props";
import { ContentData } from "../model/types/content";

export const ContentContext = createContext<{
    data: ContentData;
    setData: React.Dispatch<React.SetStateAction<ContentData>>
    updateBigSubject: (newBigSubject: any) => void;
    updateScript: (script: string) => void;
}>({
    data: {
        bigSubject: "",
        mainSubject: "",
        script: "",
        imgPrompt1: "",
        imgPrompt2: "",
        imgPrompt3: "",
    },
    setData: () => {},
    updateBigSubject: () => {},
    updateScript: () => {},
});

export const useContentContext = () => useContext(ContentContext);

export const ContentProvider: React.FC<ChildernsProps> = ({ children }) => {
    const [data, setData] = useState<ContentData>({
        bigSubject: "",
        mainSubject: "",
        script: "",
        imgPrompt1: "",
        imgPrompt2: "",
        imgPrompt3: "",
    });

    const updateBigSubject = (newBigSubject: any) => {
        setData((prevData) => ({
            ...prevData,
            bigSubject: newBigSubject,
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
        <ContentContext.Provider value={{ data, setData, updateBigSubject, updateScript }}>
            {children}
        </ContentContext.Provider>
    );
};
