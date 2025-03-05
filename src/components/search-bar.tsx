import React, { useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Add a city"
        className="rounded-md border border-gray-600 p-2"
      />
    </div>
  );
}

export default SearchBar;
