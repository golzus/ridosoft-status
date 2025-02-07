const CategoryTable = ({ fullPeriodWorkTypes }) => {
    return (
      <table className="category-table">
        <thead>
          <tr>
            <th>קטגוריה</th>
            <th>שעות</th>
            <th>הערכת שעות כוללת</th>
            <th>עלות</th>
            <th>סה''כ עלות משוערת לתחום זה</th>
            <th>קישור ל-XL</th> 
          </tr>
        </thead>
        <tbody>
          {fullPeriodWorkTypes.map((category) => (
            <tr key={category.name}> 
              <td>{category.name}</td>
              <td>{category.hours}</td>
              <td>{category.estimated}</td>
              <td>{category.actualCost} ש"ח</td>
              <td>{category.estimatedCost}</td>
              <td><a href={category.xl} target="_blank" rel="noopener noreferrer">xl</a></td> 
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default CategoryTable;
  