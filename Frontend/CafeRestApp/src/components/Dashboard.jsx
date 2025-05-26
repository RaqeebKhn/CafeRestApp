import React from "react";
import "./Dashboard.css";
import VerticalNavBar from "./VerticalNavBar";

import chefsIcon from '../assets/bowl.png';
import waitersIcon from '../assets/rupees.png';
import customersIcon from '../assets/clients.png';
import ordersIcon from '../assets/orders.png';

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

export default function Dashboard() {
  return (
    <div className="dashboard-root">
      <div className="dashboard-header">
        <div className="header-actions">
          <input 
            className="dashboard-filter" 
            placeholder="Filter..."
            type="text"
          />
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