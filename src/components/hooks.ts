import { useEffect, useState } from "react";
import { BASE_API_URL } from "../lib/Constants";
import { useQuery } from "@tanstack/react-query";
import { JobItem, JobItemExpanded } from "../lib/Types";

  type JobItemApiResponse = {
    public: boolean;
    jobItem: JobItemExpanded;
  }


  const fetchJobItem =  async (id: number) : Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if(!response.ok){
    const errorData = await response.json()
    throw new Error(errorData.description)
    }
    const data = await response.json();
    return data;
  }

  export function useJobItem(id: number| null){
  const { data, isInitialLoading } = useQuery(
    ['job-item', id],
    //2 component
    () => (id ? fetchJobItem(id) : null),
    //3 component
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: (error) => {
        console.log(error);
        
        
      },
    }
  );

  return {jobItem: data?.jobItem,
          isLoading: isInitialLoading} as const;
  
  }


  //---------------------------------------
  type JobItemsApiResponse = {
    public: boolean;
    sorted: boolean;
    jobItems: JobItem[];
  }


  const fetchJobItems = async (searchText: string) : Promise<JobItemsApiResponse> => {
    const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
    const data = await response.json(); 
    return data;
  }

  export function useJobItems(searchText: string){
    const {data, isInitialLoading} = useQuery(
      //1 argument
      ['job-items', searchText],
      //2 argument
      () => fetchJobItems(searchText),
      //3 argument
      {
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: Boolean(searchText),
        onError: (error) => {
          console.log(error); 
        },
  });

  return {
    jobItems: data?.jobItems,
    isLoading: isInitialLoading
  } as const;
  }
  
  //---------------------------------------



  export function useDebounce <T> (value: T, delay = 500) : T{
    const[debouncedValue, setDebouncedValue]= useState(value);
    
    useEffect(() => {
      const timerId = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(timerId);
      
    }, [value, delay])
    return debouncedValue;
  }
  
  export function useActiveId(){
    const [activeId, setActiveId] = useState<number| null>(null);
    useEffect(() => {
      const handleChangeHash = () => {
        const id = +window.location.hash.slice(1);
        setActiveId(id);      
      }
      handleChangeHash();
  
      window.addEventListener('hashchange', handleChangeHash);
      return () => {
        window.removeEventListener('hashchange', handleChangeHash );
      }
    }, [])
    return activeId;
  }
  