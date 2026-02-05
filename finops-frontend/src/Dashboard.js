import { useEffect, useState } from "react";
import { fetchSavingsData } from "./data";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from "recharts";
import "./App.css";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

function Dashboard() {
  const [savingsData, setSavingsData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSavingsData();
      setSavingsData(data);
    };

    loadData();

    const interval = setInterval(loadData, 10000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  const totalSavings = savingsData.reduce(
    (sum, i) => sum + i.money_saved, 0
  );

  const lastRun = savingsData[0]?.date;

  const pieData = savingsData.map(s => ({
    name: s.resource_id,
    value: s.money_saved
  }));

  return (
    <div className="page">
      <header className="header">
        <h1>AWS FinOps Dashboard</h1>
        <p>Automated Cost Optimization • Account Overview</p>
      </header>

      {/* SUMMARY CARDS */}
      <div className="cards-grid">
        <div className="card">
          <h4>Total Savings</h4>
          <h2>${totalSavings.toFixed(4)}</h2>
          <p>Generated automatically</p>
        </div>

        <div className="card">
          <h4>Resources Optimized</h4>
          <h2>{savingsData.length}</h2>
          <p>Auto-stopped EC2 instances</p>
        </div>

        <div className="card">
          <h4>Last Optimization</h4>
          <h2>
            {lastRun
              ? new Date(lastRun).toLocaleString()
              : "-"}
          </h2>
        </div>

        <div className="card">
          <h4>Infrastructure State</h4>
          <h2>Stable</h2>
          <p>All monitored resources inactive</p>
        </div>
      </div>

      {/* CHART */}
      <div className="chart-card">
        <h3>Savings Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={90}
            >
              {pieData.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* OPTIMIZATION ACTIONS TABLE */}
      <div className="table-card">
        <h2>Optimization Actions</h2>

        <table>
          <thead>
            <tr>
              <th>Resource ID</th>
              <th>Action</th>
              <th>When</th>
              <th>Region</th>
              <th>Savings</th>
              <th>AWS</th>
            </tr>
          </thead>
          <tbody>
            {savingsData.map((s, idx) => (
              <tr key={idx}>
                <td>{s.resource_id}</td>
                <td>
                  <span className="badge stopped">
                    Auto-stopped
                  </span>
                </td>
                <td>
                  {new Date(s.date).toLocaleString()}
                </td>
                <td>{s.region}</td>
                <td className="green">
                  ${s.money_saved}
                </td>
                <td>
                  <a
                    href={`https://console.aws.amazon.com/ec2/v2/home?region=${s.region}#InstanceDetails:instanceId=${s.resource_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="aws-link"
                  >
                    Open
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {savingsData.length === 0 && (
          <p style={{ marginTop: 20 }}>
            No optimization actions yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
