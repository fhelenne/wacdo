function Pagination({ currentCount, totalCount, itemType }) {
  return (
    <footer>
      <div>
        Affichage de 1 à {currentCount} sur {totalCount} {itemType}
      </div>
      <div>
        <button>Précédent</button>
        <button>Suivant</button>
      </div>
    </footer>
  );
}

export default Pagination;