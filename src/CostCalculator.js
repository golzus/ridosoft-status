// CostCalculator.js - הקומפוננטה הראשית שמחברת את הכל
import React, { useEffect, useState } from "react";
import PasswordCheck from "./PasswordCheck";
import ViewSelector from "./ViewSelector";
import CategoryTable from "./CategoryTable";
import Summary from './Summary';
import "./CostCalculator.css";
import Axios from "axios";
import WorkChart from "./graph/WorkChart";
import PieChart from "./graph/PieChart";
import PaymentHistory from "./PaymentHistory";

const CostCalculator = () => {
  const paymentDetailsTillNowDemo = [
    { date: "2024-01-10", hours: 60, cost: 5000, paymentMethod: "כרטיס אשראי" },
    { date: "2024-02-05", hours: 160, cost: 12000, paymentMethod: "העברה בנקאית" },
    { date: "2024-03-20", hours: 256, cost: 20000, paymentMethod: "צ'ק" },
    { date: "2024-04-15", hours: 433, cost: 35000, paymentMethod: "כרטיס אשראי" },
    { date: "2024-05-01", hours: 25, cost: 2000, paymentMethod: "צ'ק" },
  ]
  const fullPeriodWorkTypesDemo = [
    { 
        name: "אפיון", 
        hours: 60, 
        estimated: 100, 
        hourlyRate: 83.33, // 5000 / 60 
        date: "2024-01-10", 
        xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
    },
    { 
        name: "עיצוב גרפי", 
        hours: 160, 
        estimated: 600, 
        hourlyRate: 75, // 12000 / 160
        date: "2024-02-05", 
        xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
    },
    { 
        name: "הנדסה", 
        hours: 256, 
        estimated: 600, 
        hourlyRate: 78.13, // 20000 / 256
        date: "2024-03-20", 
        xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
    },
    { 
        name: "תכנות", 
        hours: 433, 
        estimated: 500, 
        hourlyRate: 80.83, // 35000 / 433
        date: "2024-04-15", 
        xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
    },
    { 
        name: "תשתיות", 
        hours: 25, 
        estimated: 600, 
        hourlyRate: 80, // 2000 / 25
        date: "2024-05-01", 
        xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
    },
    { 
        name: "בדיקות", 
        hours: 13, 
        estimated: 700, 
        hourlyRate: 76.92, // 1000 / 13
        date: "2024-06-25", 
        xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
    },
    { 
        name: "נוספות", 
        hours: 8, 
        estimated: 700, 
        hourlyRate: 75, // 600 / 8
        date: "2024-06-30", 
        xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
    }
];
const lastMonthWorkTypesDemo = [
  { name: "אפיון", hours: 10, estimated: 100, hourlyRate: 20, date: "2024-01-10",  xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
 },
  { name: "עיצוב גרפי", hours: 16, estimated: 100, hourlyRate: 75, date: "2024-02-05" , xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
},
  { name: "הנדסה", hours: 25, estimated: 100, hourlyRate: 8, date: "2024-03-20", xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
 },
  { name: "תכנות", hours: 43, estimated: 100, hourlyRate: 8.14, date: "2024-04-15", xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
 },
  { name: "תשתיות", hours: 2, estimated: 100, hourlyRate: 100, date: "2024-05-01", xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
 },
  { name: "בדיקות", hours: 1, estimated: 100, hourlyRate: 100, date: "2024-06-25",  xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
 },
  { name: "נוספות", hours: 8, estimated: 100, hourlyRate: 7.5, date: "2024-06-30", xl: "https://docs.google.com/spreadsheets/d/17S1_ItQO1CBuG0F1L8-T3dEWUUxXr_TMjrfR88w7D6o/edit?gid=717609444#gid=717609444"
 }
];
  const [paymentDetailsTillNow, setPaymentDetailsTillNow] = useState(paymentDetailsTillNowDemo);
  const [validPassword, setValidPassword] = useState(false);
  const [viewOption, setViewOption] = useState("all");
  const [fullPeriodWorkTypes, setFullPeriodWorkTypes] = useState(fullPeriodWorkTypesDemo);
  const [lastMonthWorkTypes, setLastMonthWorkTypes] = useState(lastMonthWorkTypesDemo);
  const [seePayments, setSeePayments] = useState(false);
  const currentDate = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(currentDate.getMonth() - 1);
  const togglePaymentsVisibility = () => {
    setSeePayments((prevState) => !prevState);
  };
const updatePeriodWorkTypesArray = (periodWorkTypes) => 
  periodWorkTypes.map(item => ({
    ...item,
    actualCost: Number(( item.hours * item.hourlyRate).toFixed(2)), 
    estimatedCost:Number( (item.estimated * item.hourlyRate).toFixed(2))
}));

  const fetchFullWorkTypes = async () => {
    try {
      const { data } = await Axios.get('the/url/of/the/data');
      setFullPeriodWorkTypes(data);
    } catch (e) {
      console.log(e, "error at fetching data");
    }
  };
  const fetchLastmonthWorkTypes = async () => {
    try {

      const { data } = await Axios.get('the/url/of/the/data');
      setLastMonthWorkTypes(data);

    } catch (e) {
      console.log(e, "error at fetching LastMonthWorkTypes data");
    }
  }
  const fetchPaymentDetailsTillNow = async () => {
    try {
      const { data } = await Axios.get('the/url/of/the/data');
      setPaymentDetailsTillNow(data);
    } catch (e) {
      console.log(e, "error at fetching PaymentDetailsTillNow data");
    }
  }

  useEffect(() => {
    fetchFullWorkTypes();
    fetchLastmonthWorkTypes();
    fetchPaymentDetailsTillNow();
    setFullPeriodWorkTypes(updatePeriodWorkTypesArray(fullPeriodWorkTypes))
    setLastMonthWorkTypes(updatePeriodWorkTypesArray(lastMonthWorkTypes))
  }, [validPassword]);
  const filteredfullPeriodWorkTypes = viewOption === "all"
    ? fullPeriodWorkTypes
    : lastMonthWorkTypes

  const totalHours = filteredfullPeriodWorkTypes?.reduce((sum, { hours }) => sum + hours, 0) || 0;
  const totalActualCost = filteredfullPeriodWorkTypes.reduce((sum, item) => sum + item.actualCost, 0).toFixed(2)||0;
const totalEstimatedCost = filteredfullPeriodWorkTypes.reduce((sum, item) => sum + item.estimatedCost, 0).toFixed(2)||0;

  if (!validPassword)
    return <PasswordCheck onSuccess={() => setValidPassword(true)} />;
  return (
    <div className="container">
      <>
        <h1>מחשבון שעות ועלויות פרויקט</h1>
        <ViewSelector
          viewOption={viewOption}
          setViewOption={setViewOption}
          options={{
            all: "כל התקופה האחרונה",
            lastMonth: ` חודש אחרון (${lastMonth.toLocaleString("he-IL", { month: "long" })})`
          }} />


        <section className="table-chart-container">
          <CategoryTable fullPeriodWorkTypes={filteredfullPeriodWorkTypes} />
         
          <div><WorkChart    filteredfullPeriodWorkTypes={filteredfullPeriodWorkTypes} />
            <PieChart className='pieChart'   filteredfullPeriodWorkTypes={filteredfullPeriodWorkTypes} />
          </div>
        </section>
        <Summary totalHours={totalHours} totalCost={totalActualCost}totalEstimatedCost={totalEstimatedCost} fullPeriod={viewOption==='all'} />
        {viewOption === 'all' && <button className="paymentBtn" onClick={togglePaymentsVisibility}>
          {!seePayments ? 'לצפיה בכל התשלומים עד כה' :
            'להסתרת פירוט התשלומים'}</button>}
        {
         viewOption==='all'&& seePayments && <PaymentHistory paymentDetailsTillNow={paymentDetailsTillNow} />
        }
      </>
    </div>
  );
};

export default CostCalculator;
