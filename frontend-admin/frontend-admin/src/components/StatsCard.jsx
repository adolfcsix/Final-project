const StatsCard = ({ title, value }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold text-blue-600">{value}</p>
      </div>
    );
  };
  
  export default StatsCard;
  