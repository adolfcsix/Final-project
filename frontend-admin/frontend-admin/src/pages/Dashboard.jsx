import Chart from "../components/Chart";
import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      
      {/* Card thống kê */}
      <div className="grid grid-cols-3 gap-4">
        <StatsCard title="Total Orders" value="1,245" />
        <StatsCard title="New Users" value="345" />
        <StatsCard title="Revenue" value="$12,500" />
      </div>

      {/* Biểu đồ */}
      <div className="bg-white p-4 mt-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Sales Data</h2>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
