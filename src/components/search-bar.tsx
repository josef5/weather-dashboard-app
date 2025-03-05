import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCity } from "../store/weatherSlice";
import { Search } from "lucide-react";

function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (search.trim()) {
      dispatch(
        addCity({
          id: search.toLowerCase(),
          name: search.trim(),
          pinned: false,
        }),
      );

      setSearch("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <Search className="absolute top-2.5 left-3 h-5 w-5 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Add a city"
          className="w-full rounded-md border border-gray-600 p-2 pl-9"
        />
      </div>
    </form>
  );
}

export default SearchBar;
