import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCity } from "../store/weatherSlice";

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
        }),
      );

      setSearch("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Add a city"
        className="rounded-md border border-gray-600 p-2"
      />
    </form>
  );
}

export default SearchBar;
