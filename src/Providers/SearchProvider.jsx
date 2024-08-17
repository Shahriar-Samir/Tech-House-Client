import React, { createContext, useState } from 'react';

export const SearchContext = createContext(null)

const SearchProvider = ({children}) => {
        const [value,setValue] = useState('null')
        const searchValue = (getValue)=>{
            setValue(getValue)
        }
        const searchItems= {value,searchValue}
    return (
        <SearchContext.Provider value={searchItems}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;