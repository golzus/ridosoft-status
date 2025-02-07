
const ViewSelector = ({ viewOption, setViewOption, options }) => {
  return (
    <div className="view-options">
      {Object.entries(options).map(([key, label], index) => (
        <button
          key={key}
          className={viewOption === key ? "active" : ""}
          onClick={() => setViewOption(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
export default ViewSelector;