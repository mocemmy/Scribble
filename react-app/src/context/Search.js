import React, { useContext, useState } from "react";



const SearchContext = React.createContext();

export function SearchProvider({ children }) {
    const [searchPhrase, setSearchPhrase] = useState(null);

    const contextValue = {
        searchPhrase,
        setSearchPhrase
    }

    return (
        <>
            <SearchContext.Provider value={contextValue}>
                {children}
            </SearchContext.Provider>
        </>
    )

}

export const useSearch = () => useContext(SearchContext)