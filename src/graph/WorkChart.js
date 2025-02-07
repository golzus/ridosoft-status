import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorkChart = ({ filteredfullPeriodWorkTypes }) => {

  if (!filteredfullPeriodWorkTypes || filteredfullPeriodWorkTypes.length === 0) {
    return <p>אין נתונים להצגה {filteredfullPeriodWorkTypes}</p>;
  }

  const data = {
    labels: filteredfullPeriodWorkTypes.map((item) => item.name),
    datasets: [
      {
        label: "שעות עבודה",
        data: filteredfullPeriodWorkTypes.map((item) => item.hours),
        backgroundColor: [
            "#0000cd", // כחול כהה יותר
          ],
      },
      {
        label:  "זמן משוער (₪)",
        data:  
           filteredfullPeriodWorkTypes.map((item) => item.estimated) ,
        backgroundColor: ["#9b30b1"], // סגול בהיר
      },
    ],
  };
  return<>
<h3>גרף זה מציג את כמות שעות העבודה בפועל מול הזמן המשוער לכל שלב בפרויקט.</h3>
<Bar className="chart-container" data={data} /></> ;
};

  
export default WorkChart;
