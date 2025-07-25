function DataTable({ columns, data, renderActions }) {
  return (
    <table role="table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
          {renderActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={row.id || rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>
                {column.render ? column.render(row) : row[column.key]}
              </td>
            ))}
            {renderActions && (
              <td>
                {renderActions(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;