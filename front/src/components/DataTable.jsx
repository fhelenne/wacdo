import '../styles/components/DataTable.css';
function DataTable({ columns, data, renderActions }) {
  console.log(data);
  return (
    <div 
      role="region" 
      aria-label="Data table"
    >
      <div>
        <table role="table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  role="columnheader"
                >
                  {column.header}
                </th>
              ))}
              {renderActions && (
                <th role="columnheader">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr 
                key={row.id || rowIndex}
                role="row"
              >
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex}
                    role="cell"
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                {renderActions && (
                  <td role="cell">
                    <div>
                      {renderActions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div role="status">
          <div>📋</div>
          <div>Aucune donnée disponible</div>
          <div>Il n'y a actuellement aucun élément à afficher.</div>
        </div>
      )}
    </div>
  );
}

export default DataTable;