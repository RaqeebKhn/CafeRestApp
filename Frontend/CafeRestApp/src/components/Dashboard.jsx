import React, { useState } from "react";
import "./Dashboard.css";
import VerticalNavBar from "./VerticalNavBar";

import chefsIcon from '../assets/bowl.png';
import waitersIcon from '../assets/rupees.png';
import customersIcon from '../assets/clients.png';
import ordersIcon from '../assets/orders.png';
import revenueGraph from '../assets/revenuegraph.png';

const metrics = [
  { label: "Total Chefs", value: "04", icon: chefsIcon },
  { label: "Total Waiters", value: "08", icon: waitersIcon },
  { label: "Total Customers", value: "12", icon: customersIcon },
  { label: "Total Orders", value: "24", icon: ordersIcon },
];


const chefOrders = [
  { id: 1, name: "Manesh", ordersTaken: "03" },
  { id: 2, name: "Pritam", ordersTaken: "07" },
  { id: 3, name: "Yash", ordersTaken: "05" },
  { id: 4, name: "Tenzen", ordersTaken: "08" },
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
  const [showAvailable, setShowAvailable] = useState(true);

  const handleOrderPeriodChange = (period) => {
    setOrderPeriod(period);
  };

  const handleRevenuePeriodChange = (period) => {
    setRevenuePeriod(period);
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
                <div className="metric-info">
                  <h3>{metric.value}</h3>
                  <p>{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-section">
          <div className="analytics-grid">
            <div className="analytics-card order-summary">
              <div className="analytics-header">
                <h3 className="analytics-title">Order Summary</h3>
                <select 
                  className="period-selector"
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
              
              <div className="order-counts">
                {orderTypes.map((type) => (
                  <div key={type.type} className="order-count-item">
                    <h4>{type.count}</h4>
                    <p>{type.type}</p>
                  </div>
                ))}
              </div>

              <div className="order-visualization">
                <div className="donut-chart">
                  <svg viewBox="0 0 100 100" className="donut">
                    <circle cx="50" cy="50" r="40" className="donut-ring" />
                    <circle cx="50" cy="50" r="40" className="donut-segment takeaway" strokeDasharray="30 70" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" className="donut-segment served" strokeDasharray="50 50" strokeDashoffset="-30" />
                    <circle cx="50" cy="50" r="40" className="donut-segment dinein" strokeDasharray="20 80" strokeDashoffset="-80" />
                  </svg>
                </div>

                <div className="percentage-bars">
                  {orderTypes.map((type) => (
                    <div key={type.type} className="percentage-bar-item">
                      <div className="percentage-bar-label">
                        <span>{type.type}</span>
                        <span>{type.percentage}</span>
                      </div>
                      <div className="percentage-bar-track">
                        <div 
                          className={`percentage-bar-fill bar-${type.type.toLowerCase().replace(' ', '-')}`}
                          style={{ width: type.percentage }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="analytics-card revenue">
              <div className="analytics-header">
                <h3 className="analytics-title">Revenue</h3>
                <select 
                  className="period-selector"
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
                <h3 className="analytics-title">Tables</h3>
                <div className="table-status-legend">
                  <button 
                    className={`status-toggle ${!showAvailable ? 'active' : ''}`}
                    onClick={() => setShowAvailable(false)}
                  >
                    Reserved
                  </button>
                  <button 
                    className={`status-toggle ${showAvailable ? 'active' : ''}`}
                    onClick={() => setShowAvailable(true)}
                  >
                    Available
                  </button>
                </div>
              </div>
              
              <div className="tables-grid">
                {tables
                  .filter(table => showAvailable ? table.status === 'available' : true)
                  .map((table) => (
                    <div 
                      key={table.id} 
                      className={`table-item ${table.status}`}
                    >
                      <div className="table-label">Table {table.number}</div>
                    </div>
                ))}
              </div>
            </div>

            <div className="analytics-card chef-orders">
              <div className="chef-orders-container">
                <table className="chef-orders-table">
                  <thead>
                    <tr>
                      <th>Chef Name</th>
                      <th>Order Taken</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chefOrders.map((chef) => (
                      <tr key={chef.id}>
                        <td>{chef.name}</td>
                        <td>{chef.ordersTaken}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}