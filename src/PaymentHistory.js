import { useEffect } from "react";
const PaymentHistory = ({ paymentDetailsTillNow }) => {
  useEffect(() => {
    console.log(paymentDetailsTillNow, "paymentDetailsTillNow");
  }, [paymentDetailsTillNow]);

  return (
    <div className="container-payment">
      <h2>פירוט תשלומים עד כה</h2>
      <table className="category-table">
        <thead>
          <tr>
            <th>תאריך</th>
            <th>שעות עבודה</th>
            <th>עלות</th>
            <th>אופן תשלום</th>
          </tr>
        </thead>
        <tbody>
          {paymentDetailsTillNow.map((payment) => {
            return (
              <tr key={payment.date}>
                <td>{payment.date}</td>
                <td>{payment.hours}</td>
                <td>{payment.cost}</td>
                <td>{payment.paymentMethod}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
