import React, {createContext} from 'react';
import {useRef} from 'react';
export const MyContext = createContext();

export const ContextProvider = ({children}) => {
  const PostFlatListRef = useRef();
  const ProfileFlatListRef = useRef();
  const ExploreSpacesFlatListRef = useRef();

  return (
    <MyContext.Provider
      value={{PostFlatListRef, ProfileFlatListRef, ExploreSpacesFlatListRef}}>
      {children}
    </MyContext.Provider>
  );
};
