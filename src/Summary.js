const Summary = ({ totalHours, totalCost, totalEstimatedCost, fullPeriod }) => {
  return (
    <div className="summary-container">
      <p className="summary-item">
        <strong>סה"כ שעות:</strong> {totalHours}
      </p>
      <p className="summary-item">
        <strong>סה"כ לתשלום כולל מע"מ:</strong> {totalCost.toLocaleString()} ₪
      </p>
      <p className="summary-item">
        <strong>{!fullPeriod ? "סה''כ תשלום משוער:" : "סה''כ שולם:"}</strong>{" "}
        {totalEstimatedCost.toLocaleString()} ₪
      </p>
      <p className="summary-item">
        <strong>מועד התשלום הבא:</strong>{" "}
        {(() => {
          const currentDate = new Date();
          currentDate.setMonth(currentDate.getMonth() + 1);
          currentDate.setDate(10);
          return currentDate.toLocaleDateString("he-IL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        })()}
      </p>
      <a
        href="https://pages.greeninvoice.co.il/payments/links/62841002-518e-472e-88c5-55f702c7a28b"
        target="_blank"
        rel="noopener noreferrer"
        className="payment-button"
      >
        לתשלום
      </a>
    </div>
  );
};

export default Summary;
