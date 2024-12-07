import { useEffect, useState } from "react";
import { BASE_API_URL } from "../lib/Constants";
import { useQuery } from "@tanstack/react-query";

const fetchJobItem =  async (id: number) => {
  
  const response = await fetch(`${BASE_API_URL}/${id}`);
  const data = await response.json();
  return data;
}

  export function useJobItem(id: number| null){
  const { data, isLoading } = useQuery(
    ['job-item', id],
    //2 component
    () => fetchJobItem(id),
    //3 component
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: () => {
        
      },
    }
  );
  const jobItem = data.jobItem;
  return {jobItem, isLoading} as const;
  
  }

  export function useJobItems(searchText: string){
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const totalNumberOfResults = jobItems.length;
  const jobItemsSliced = jobItems.slice(0,7);
  
  useEffect(()=> {
    if(!searchText) return;
    
    const  fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}?search=${searchText}`
      );
      
      const data = await response.json();   
      console.log(data);
      
      setIsLoading(false);
      setJobItems(data.jobItems)     
    }
    fetchData();
  }, [searchText])
  
  return {
    jobItemsSliced,
    isLoading,
    totalNumberOfResults} as const;
  }
  
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
  