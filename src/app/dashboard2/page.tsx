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

// Future predicted data
const futureData = [
  { time: "2024-03-01", latency: 40, devices: 30, bandwidth: 45, cost: 15 },
  { time: "2024-03-02", latency: 38, devices: 50, bandwidth: 50, cost: 25 },
  { time: "2024-03-03", latency: 35, devices: 70, bandwidth: 55, cost: 35 },
  { time: "2024-03-04", latency: 33, devices: 85, bandwidth: 60, cost: 45 },
  { time: "2024-03-05", latency: 30, devices: 100, bandwidth: 65, cost: 55 },
  { time: "2024-03-06", latency: 28, devices: 120, bandwidth: 70, cost: 65 },
];

const graphOptions = {
  latency: { key: "latency", label: "Predicted Latency", unit: "ms", color: "#82ca9d" },
  devices: { key: "devices", label: "Predicted No. Devices Connected", unit: "", color: "#8884d8" },
  bandwidth: { key: "bandwidth", label: "Predicted Bandwidth", unit: "Mbps", color: "#ff7300" },
  cost: { key: "cost", label: "Predicted Cost", unit: "£", color: "#00C49F" },
};

export default function Dashboard2() {
  const [selectedGraph, setSelectedGraph] = useState("latency");
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  // Toggle action selection
  const toggleAction = (action) => {
    setSelectedActions((prev) =>
      prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]
    );
  };

  // Handle "Update Service" Button Click
  const updateService = () => {
    if (selectedActions.length === 0) {
      alert("Please select at least one action to update the service.");
    } else {
      alert(`Service Updated with: ${selectedActions.join(", ")}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Future Forecast Dashboard</h1>

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
          <LineChart data={futureData}>
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

      {/* Suggested Actions */}
      <div className="bg-gray-800 p-4 rounded-lg mt-6">
        <h2 className="text-xl font-semibold text-white mb-4">Suggested Actions</h2>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={selectedActions.includes("Switch to Edge Service")}
              onChange={() => toggleAction("Switch to Edge Service")}
              className="w-5 h-5"
            />
            Switch the Service to Edge
          </label>

          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={selectedActions.includes("Choose uRLLC Slice")}
              onChange={() => toggleAction("Choose uRLLC Slice")}
              className="w-5 h-5"
            />
            Choose uRLLC Slice
          </label>
        </div>

        {/* Update Service Button */}
        <button
          onClick={updateService}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
        >
          Update Service
        </button>
      </div>
    </div>
  );
}
