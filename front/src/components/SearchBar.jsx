function SearchBar({ placeholder, filters = [] }) {
  return (
    <div>
      <input
        type="text"
        role="search"
        placeholder={placeholder}
      />
      {filters.map((filter, index) => (
        <select key={index}>
          <option value="">{filter.defaultOption}</option>
          {filter.options.map((option, optIndex) => (
            <option key={optIndex} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}

export default SearchBar;