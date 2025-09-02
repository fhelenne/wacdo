import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/forms.css';
import '../styles/components/SearchBar.css';
import {
  faMagnifyingGlass,
} from '../utils/icons.js';

function SearchBar({ placeholder, filters = [] }) {
    return '';
  return (
    <div role="search">
      <div>

          <input
            type="text"
            role="searchbox"
            placeholder={placeholder}
          />

        {filters.length > 0 && (
          <div>
            {filters.map((filter, index) => (
              <select key={index} role="combobox">
                <option value="">{filter.defaultOption}</option>
                {filter.options.map((option, optIndex) => (
                  <option key={optIndex} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
        <button role="button">
          <FontAwesomeIcon icon={faMagnifyingGlass} /> Rechercher
        </button>
      </div>
    </div>
  );
}

export default SearchBar;