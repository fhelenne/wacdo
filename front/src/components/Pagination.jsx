import '../styles/components/Pagination.css';
function Pagination({ currentCount, totalCount, itemType }) {
  return (
    <footer role="contentinfo">
      <div>
        <button role="button">
          ← Précédent
        </button>
        <button role="button">
          Suivant →
        </button>
      </div>
      <div>
        <div>
          <p role="status">
            Affichage de <span>1</span> à{' '}
            <span>{currentCount}</span> sur{' '}
            <span>{totalCount}</span> {itemType}
          </p>
        </div>
        <div>
          <nav 
            role="navigation"
            aria-label="Pagination"
          >
            <button role="button">
              <span className="sr-only">Précédent</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              role="button"
              aria-current="page"
            >
              1
            </button>
            <button role="button">
              <span className="sr-only">Suivant</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Pagination;