import React from "react";
import { Card, CardContent } from "../components/Card";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


const data = [
  { name: "Jan", stock: 400 },
  { name: "Feb", stock: 300 },
  { name: "Mar", stock: 500 },
  { name: "Apr", stock: 700 },
];

const Home = () => {
    return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Warehouse Dashboard</h2>
          <div className="grid grid-cols-3 gap-6"> {/* Tăng gap để các card thoáng hơn */}
            {[
              { title: "Total Products", value: "1,230" },
              { title: "Pending Orders", value: "89" },
              { title: "Low Stock Alerts", value: "15" },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">{stat.title}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      );
    };
export default Home;
