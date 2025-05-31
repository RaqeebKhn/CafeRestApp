import React, { useState } from 'react';
import './OrderLine.css';
import forkIcon from '../assets/fork.png';

const OrderLine = () => {
  const [orders, setOrders] = useState([
    { id: '001', table: '01', time: '10:30 AM', status: 'completed', items: ['Coffee', 'Sandwich'] },
    { id: '002', table: '03', time: '10:45 AM', status: 'in-progress', items: ['Pasta', 'Salad', 'Soda'] },
    { id: '003', table: '05', time: '11:00 AM', status: 'pending', items: ['Pizza', 'Beer'] },
    { id: '004', table: '02', time: '11:15 AM', status: 'completed', items: ['Burger', 'Fries'] },
    { id: '005', table: '07', time: '11:30 AM', status: 'in-progress', items: ['Steak', 'Wine'] },
    { id: '006', table: '04', time: '11:45 AM', status: 'pending', items: ['Sushi', 'Tea'] },
    { id: '007', table: '08', time: '12:00 PM', status: 'completed', items: ['Ramen', 'Gyoza', 'Green Tea'] },
    { id: '008', table: '10', time: '12:15 PM', status: 'in-progress', items: ['Curry', 'Rice', 'Mango Lassi'] },
    { id: '009', table: '06', time: '12:30 PM', status: 'pending', items: ['Tacos', 'Nachos', 'Margarita'] },
    { id: '010', table: '09', time: '12:45 PM', status: 'completed', items: ['Pancakes', 'Orange Juice'] }
  ]);

  
  const getStatusInfo = (status) => {
    switch(status) {
      case 'completed':
        return { text: 'Completed', color: '#34C759', bgColor: '#31FF65' }; 
      case 'in-progress':
        return { text: 'In Progress', color: '#FF9500', bgColor: '#FDC474' }; 
      case 'pending':
        return { text: 'Pending', color: '#F44336', bgColor: '#d28d8c' }; 
      default:
        return { text: status, color: '#757575', bgColor: '#f5f5f5' };
    }
  };

  return (
    <div className="orderline-container">
      <div className="orderline-header">
        <h2><img src={forkIcon} alt="Fork" className="fork-icon" /> Order Line</h2>
      </div>

      <div className="orders-list">
        {orders.map((order) => {
          const statusInfo = getStatusInfo(order.status);
          
          return (
            <div 
              key={order.id} 
              className="order-card"
              style={{ backgroundColor: statusInfo.bgColor }}
            >
              <div className="order-top-box">
                <div className="order-header">
                  <div className="order-id">
                    <img src={forkIcon} alt="Fork" className="fork-icon" />
                    <span>#{order.id}</span>
                  </div>
                </div>
                
                <div className="order-details">
                  <div className="detail-item">
                    <span className="detail-label">Table -</span>
                    <span className="detail-value">{order.table}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label"></span>
                    <span className="detail-value">{order.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="order-bottom-box">
                <div className="items-label">Items:</div>
                <div className="items-list">
                  {order.items.map((item, index) => (
                    <span key={index} className="item-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="status-container">
                <div 
                  className="order-status"
                  style={{ backgroundColor: statusInfo.color }}
                >
                  {statusInfo.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderLine;