function SearchBar({ placeholder, filters = [] }) {
  return (
    <div role="search">
      <div>
        <div>
          <input
            type="text"
            role="searchbox"
            placeholder={placeholder}
          />
        </div>
        {filters.length > 0 && (
          <div>
            {filters.map((filter, index) => (
              <div key={index}>
                <select role="combobox">
                  <option value="">{filter.defaultOption}</option>
                  {filter.options.map((option, optIndex) => (
                    <option key={optIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
        <div>
          <button role="button">
            🔍 Rechercher
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;