"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "2024-02-01", latency: 30, devices: 20, bandwidth: 50, cost: 10 },
  { time: "2024-02-02", latency: 28, devices: 35, bandwidth: 55, cost: 20 },
  { time: "2024-02-03", latency: 25, devices: 50, bandwidth: 53, cost: 30 },
  { time: "2024-02-04", latency: 27, devices: 65, bandwidth: 52, cost: 40 },
  { time: "2024-02-05", latency: 23, devices: 80, bandwidth: 60, cost: 50 },
  { time: "2024-02-06", latency: 20, devices: 100, bandwidth: 65, cost: 60 },
];

const graphOptions = {
  latency: { key: "latency", label: "Time vs Latency", unit: "ms", color: "#82ca9d" },
  devices: { key: "devices", label: "Time vs No. Devices Connected", unit: "", color: "#8884d8" },
  bandwidth: { key: "bandwidth", label: "Time vs Bandwidth", unit: "Mbps", color: "#ff7300" },
  cost: { key: "cost", label: "Time vs Cost", unit: "£", color: "#00C49F" },
};

export default function Dashboard1() {
  const [selectedGraph, setSelectedGraph] = useState("latency");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Real-Time Dashboard</h1>

      {/* Dropdown for Graph Selection */}
      <div className="mb-6">
        <label className="text-white text-lg font-semibold mr-2">Select Graph:</label>
        <select
          className="p-2 bg-gray-700 text-white rounded"
          value={selectedGraph}
          onChange={(e) => setSelectedGraph(e.target.value)}
        >
          {Object.keys(graphOptions).map((key) => (
            <option key={key} value={key}>
              {graphOptions[key].label}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Graph */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-white">
          {graphOptions[selectedGraph].label} ({graphOptions[selectedGraph].unit})
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="time" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip formatter={(value) => `${value} ${graphOptions[selectedGraph].unit}`} />
            <Line
              type="monotone"
              dataKey={graphOptions[selectedGraph].key}
              stroke={graphOptions[selectedGraph].color}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
