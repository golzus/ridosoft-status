import{ useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ filteredfullPeriodWorkTypes }) => {
 
  if (!filteredfullPeriodWorkTypes || filteredfullPeriodWorkTypes.length === 0) {
    return <p>אין נתונים להצגה</p>;
  }

  const data = {
    labels: filteredfullPeriodWorkTypes.map((item) => item.name),
    datasets: [
      {
        label: "שעות עבודה",
        data: filteredfullPeriodWorkTypes.map((item) => item.hours),
           backgroundColor: [
            "#9b30b1", // סגול בהיר
            "#4b0082", // כחול אינדיגו כהה
            "#800080", // סגול כהה
            "#000080", // כחול כהה
            "#9932cc", // סגול סגלגל בהיר
            "#0000cd", // כחול כהה יותר
          ],

        borderWidth: 1,
      },
    ],
  };

  return(<>
 <h3>גרף מציג את התפלגות שעות העבודה בפועל בין שלבי הפרויקט.</h3>
 <Pie className="pieChart" data={data} />
</>

)};

export default PieChart;
