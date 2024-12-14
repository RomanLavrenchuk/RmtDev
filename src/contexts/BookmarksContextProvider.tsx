import {createContext} from "react";
import { useJobItems, useLocalStorage } from "../components/hooks";
import { JobItemExpanded } from "../lib/Types";

type BookmarksContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: JobItemExpanded[];
  isLoading: boolean;
}

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BookmarksContextProvider({children}: {children:React.ReactNode}) {
    const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number []>('bookmarkedIds', []);
    
    const {jobItems: bookmarkedJobItems, isLoading} = 
    useJobItems(bookmarkedIds);

    const handleToggleBookmark = (id: number) => {
    if(bookmarkedIds.includes(id)){
        setBookmarkedIds((prev) => prev.filter((item) => item !=id));
      }else {
        setBookmarkedIds((prev) => [...prev, id]);
      }
    };


  return  <BookmarksContext.Provider value={{
    handleToggleBookmark,
    bookmarkedJobItems,
    isLoading,
    bookmarkedIds,
  }}>{children}</BookmarksContext.Provider>

}
