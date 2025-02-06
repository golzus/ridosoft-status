// Summary.js - קומפוננטת סיכום
const Summary = ({ totalHours, totalCost }) => {
    return (
      <div>
        <p className="total">סה"כ שעות: {totalHours}</p>
        <p className="total">סה"כ לתשלום: {totalCost} ש"ח</p>
      </div>
    );
  };
  export default Summary;