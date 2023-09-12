import React, {createContext} from 'react';
import {useRef} from 'react';
export const MyContext = createContext();

export const ContextProvider = ({children}) => {
  const PostFlatListRef = useRef();

  return (
    <MyContext.Provider value={{PostFlatListRef}}>
      {children}
    </MyContext.Provider>
  );
};
