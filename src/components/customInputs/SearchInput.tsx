"use client";

import queryString from "query-string";
import { useSearchDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import InputForm from "./InputForm";

const SearchInput = () => {
  const router = useRouter();
  const [search, setSearch] = useSearchDebounce();

  useEffect(() => {
    const query = {
      title: search,
    };
    const url = queryString.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [search, router]);

  return (
    <InputForm
      type="text"
      onChange={(e) => setSearch(e.target.value)}
      placeholder="What do you want to listen to ?"
    />
  );
};

export default SearchInput;
