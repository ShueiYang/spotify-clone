import { useState, useEffect, Dispatch, SetStateAction } from "react";

type DebounceType = [string, Dispatch<SetStateAction<string>>];

export function useSearchDebounce(delay = 350): DebounceType {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchQuery);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, delay]);

  return [search, setSearchQuery];
}
