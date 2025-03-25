import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { FiUsers, FiShoppingCart, FiDollarSign } from "react-icons/fi";

const salesData = [
  { month: "Jan", sales: 500 },
  { month: "Feb", sales: 700 },
  { month: "Mar", sales: 600 },
  { month: "Apr", sales: 900 },
  { month: "May", sales: 850 },
  { month: "Jun", sales: 1000 },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard Overview</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          + Add Data
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Orders */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
            <FiShoppingCart className="text-3xl text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">1,245</h1>
          <ResponsiveContainer width="100%" height={50}>
            <BarChart data={salesData}>
              <Bar dataKey="sales" fill="#4A90E2" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* New Users */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">New Users</h2>
            <FiUsers className="text-3xl text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">345</h1>
          <ResponsiveContainer width="100%" height={50}>
            <LineChart data={salesData}>
              <Line type="monotone" dataKey="sales" stroke="#22C55E" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
            <FiDollarSign className="text-3xl text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">$12,500</h1>
          <ResponsiveContainer width="100%" height={50}>
            <LineChart data={salesData}>
              <Line type="monotone" dataKey="sales" stroke="#FBBF24" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ Sales */}
      <div className="bg-white p-6 mt-8 rounded-xl shadow-lg">
<h2 className="text-xl font-semibold text-gray-700 mb-4">📈 Sales Data</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <XAxis dataKey="month" stroke="#888" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#4A90E2" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;