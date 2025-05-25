import React from "react";
import VerticalNavBar from "./VerticalNavBar";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-root">
      <VerticalNavBar />
      <div className="dashboard-main">
        <header className="dashboard-header">
          <input className="dashboard-filter" placeholder="Filter..." />
          <span className="dashboard-filter-arrow">&#x25BC;</span>
        </header>
        <section className="dashboard-analytics">
          <h2>Analytics</h2>
          <div className="dashboard-metrics">
            <div className="metric-card">
              <div className="metric-icon chef" />
              <div>
                <div className="metric-value">04</div>
                <div className="metric-label">TOTAL CHEF</div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon revenue" />
              <div>
                <div className="metric-value">12K</div>
                <div className="metric-label">TOTAL REVENUE</div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon orders" />
              <div>
                <div className="metric-value">20</div>
                <div className="metric-label">TOTAL ORDERS</div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon clients" />
              <div>
                <div className="metric-value">65</div>
                <div className="metric-label">TOTAL CLIENTS</div>
              </div>
            </div>
          </div>
          <div className="dashboard-charts">
            <div className="chart-card order-summary">
              <div className="chart-header">
                <span>Order Summary</span>
                <select>
                  <option>Daily</option>
                </select>
              </div>
              <div className="order-summary-details">
                <div>
                  <div className="summary-value">09</div>
                  <div className="summary-label">Served</div>
                </div>
                <div>
                  <div className="summary-value">05</div>
                  <div className="summary-label">Dine In</div>
                </div>
                <div>
                  <div className="summary-value">06</div>
                  <div className="summary-label">Take Away</div>
                </div>
              </div>
              <div className="order-summary-pie">
                
                <div className="pie-placeholder" />
                <ul className="pie-legend">
                  <li>
                    <span className="legend-color takeaway" /> Take Away (24%)
                  </li>
                  <li>
                    <span className="legend-color served" /> Served (41%)
                  </li>
                  <li>
                    <span className="legend-color dinein" /> Dine In (35%)
                  </li>
                </ul>
              </div>
            </div>
            <div className="chart-card revenue">
              <div className="chart-header">
                <span>Revenue</span>
                <select>
                  <option>Daily</option>
                </select>
              </div>
              <div className="revenue-chart">
                
                <div className="linechart-placeholder">
                  <div className="linechart-xaxis">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="chart-card tables">
              <div className="chart-header">
                <span>Tables</span>
                <div className="table-legend">
                  <span className="table-dot reserved" /> Reserved
                  <span className="table-dot available" /> Available
                </div>
              </div>
              <div className="tables-grid">
                {Array.from({ length: 30 }, (_, i) => (
                  <div
                    className={
                      i % 2 === 0
                        ? "table-cell reserved"
                        : "table-cell available"
                    }
                    key={i}
                  >
                    Table {String(i + 1).padStart(2, "0")}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="dashboard-table">
            <table>
              <thead>
                <tr>
                  <th>Chef Name</th>
                  <th>Order Taken</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Manesh</td>
                  <td>03</td>
                </tr>
                <tr>
                  <td>Pritam</td>
                  <td>07</td>
                </tr>
                <tr>
                  <td>Yash</td>
                  <td>05</td>
                </tr>
                <tr>
                  <td>Tenzen</td>
                  <td>08</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}