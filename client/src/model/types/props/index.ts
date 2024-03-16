export type ChildernsProps = {
    children: React.ReactNode | React.ReactNode[];
};

export type ProvidersProps = ChildernsProps;

export type IdProps = {
    id?: string;
};

export type PropsObj<T = Record<string, any>> = {
    [key: string]: T;
};

