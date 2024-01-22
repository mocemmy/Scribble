import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkSearchBooks, thunkSearchLists } from "../store/search";



const SearchContext = React.createContext();

export function SearchProvider({ children }) {
    const [searching, setSearching] = useState(false);
    const [searchLoaded, setSearchLoaded] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState(null);

    const dispatch = useDispatch();

    const search = async (query) => {
        if(!query || !query.length){
            setSearching(false)
            setSearchLoaded(false)
            return;
        }
        await dispatch(thunkSearchBooks(query))
        await dispatch(thunkSearchLists(query))
        setSearchLoaded(true)
    }

    const contextValue = {
        searchPhrase,
        setSearchPhrase,
        searching,
        setSearching,
        searchLoaded,
        search
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