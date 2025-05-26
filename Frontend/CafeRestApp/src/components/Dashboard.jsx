import React, { useState } from "react";
import "./Dashboard.css";
import VerticalNavBar from "./VerticalNavBar";


import chefsIcon from '../assets/bowl.png';
import waitersIcon from '../assets/rupees.png';
import customersIcon from '../assets/clients.png';
import ordersIcon from '../assets/orders.png';
import revenueGraph from '../assets/revenuegraph.png';

const metrics = [
  { label: "Total Chefs", value: "4", icon: chefsIcon },
  { label: "Total Waiters", value: "8", icon: waitersIcon },
  { label: "Total Customers", value: "12", icon: customersIcon },
  { label: "Total Orders", value: "24", icon: ordersIcon },
];

const recentOrders = [
  { id: 1, orderId: "#12345", customer: "John Doe", items: "Pizza, Pasta", status: "Pending", amount: "$25.00" },
  { id: 2, orderId: "#12346", customer: "Jane Smith", items: "Burger, Fries", status: "Completed", amount: "$18.00" },
];

const timePeriods = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" }
];

const orderTypes = [
  { type: "Take away", count: "24", percentage: "30%" },
  { type: "Served", count: "40", percentage: "50%" },
  { type: "Dine-in", count: "16", percentage: "20%" }
];

const tables = [
  { id: 1, number: "1", status: "available" },
  { id: 2, number: "2", status: "available" },
  { id: 3, number: "3", status: "reserved" },
  { id: 4, number: "4", status: "available" },
  { id: 5, number: "5", status: "reserved" },
  { id: 6, number: "6", status: "available" },
  { id: 7, number: "7", status: "available" },
  { id: 8, number: "8", status: "reserved" },
  { id: 9, number: "9", status: "available" },
  { id: 10, number: "10", status: "available" },
  { id: 11, number: "11", status: "reserved" },
  { id: 12, number: "12", status: "available" },
  { id: 13, number: "13", status: "available" },
  { id: 14, number: "14", status: "available" },
  { id: 15, number: "15", status: "reserved" },
];

export default function Dashboard() {
  const [orderPeriod, setOrderPeriod] = useState("daily");
  const [revenuePeriod, setRevenuePeriod] = useState("daily");
  const [showAvailable, setShowAvailable] = useState(false);

  const handleOrderPeriodChange = (period) => {
    setOrderPeriod(period);
  };

  const handleRevenuePeriodChange = (period) => {
    setRevenuePeriod(period);
  };

  const handleTableFilter = () => {
    setShowAvailable(!showAvailable);
  };

  return (
    <div className="dashboard-root">
      <div className="dashboard-header">
        <div className="header-actions">
          <div className="filter-container">
            <input 
              className="dashboard-filter" 
              placeholder="Filter..."
              type="text"
            />
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="metrics-section">
          <h2 className="section-title">Analytics</h2>
          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <img 
                  src={metric.icon} 
                  alt={metric.label}
                  className="metric-icon"
                />
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-section">
          <div className="analytics-grid">
            
            <div className="analytics-card order-summary">
              <div className="analytics-header">
                <h3>Order Summary</h3>
                <select 
                  className="period-select"
                  value={orderPeriod}
                  onChange={(e) => handleOrderPeriodChange(e.target.value)}
                >
                  {timePeriods.map((period) => (
                    <option key={period.value} value={period.value}>
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="order-types">
                {orderTypes.map((type) => (
                  <div key={type.type} className="order-type-card">
                    <div className="order-type-icon">{type.type[0].toUpperCase()}</div>
                    <div className="order-type-content">
                      <div className="order-type-label">{type.type.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className="order-type-count">{type.count}</div>
                      <div className="order-type-percentage">{type.percentage}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-pie-chart">
                <div className="pie-chart-legend">
                  <div className="pie-chart-item">
                    <span className="pie-chart-color takeaway" />
                    <span>Take Away</span>
                    <span>30%</span>
                  </div>
                  <div className="pie-chart-item">
                    <span className="pie-chart-color served" />
                    <span>Served</span>
                    <span>50%</span>
                  </div>
                  <div className="pie-chart-item">
                    <span className="pie-chart-color dinein" />
                    <span>Dine In</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="analytics-card revenue">
              <div className="analytics-header">
                <h3>Revenue</h3>
                <select 
                  className="period-select"
                  value={revenuePeriod}
                  onChange={(e) => handleRevenuePeriodChange(e.target.value)}
                >
                  {timePeriods.map((period) => (
                    <option key={period.value} value={period.value}>
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="revenue-graph-container">
                <img src={revenueGraph} alt="Revenue Graph" className="revenue-graph" />
              </div>
            </div>

            
            <div className="analytics-card tables">
              <div className="analytics-header">
                <h3>Tables</h3>
                <button 
                  className="table-filter-btn" 
                  onClick={handleTableFilter}
                >
                  {showAvailable ? "Show Reserved" : "Show Available"}
                </button>
              </div>
              
              <div className="tables-grid">
                {tables.map((table) => (
                  <div 
                    key={table.id} 
                    className={`table-item ${table.status}`}
                    style={{ display: showAvailable && table.status === "reserved" ? "none" : "flex" }}
                  >
                    <div className="table-number">{table.number}</div>
                    <div className="table-status">{table.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="orders-section">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <button className="view-all-btn">View All</button>
          </div>
          
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.orderId}</td>
                    <td>{order.customer}</td>
                    <td>{order.items}</td>
                    <td className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </td>
                    <td>{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}