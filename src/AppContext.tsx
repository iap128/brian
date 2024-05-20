import { FC, createContext, useState } from "react";

interface AppContextInterface {
    sound: boolean;
    setSound: (sound: boolean) => void;
};

interface Props {
    children: React.ReactNode;
};

export const AppContext = createContext({} as AppContextInterface);

const AppProvider: FC<Props> = ({ children }) => {
    const [sound, setSound] = useState(true);

    return (
        <AppContext.Provider value={{ sound, setSound }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;