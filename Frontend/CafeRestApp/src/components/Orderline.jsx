import React, { useState, useEffect } from 'react';
import './Orderline.css';
import forkIcon from '../assets/fork.png';
import checkIcon from '../assets/check.png';
import hourGlassIcon from '../assets/hour-glass.png';

const OrderLine = () => {
  const [orders, setOrders] = useState([
    { id: '001', table: '01', time: '10:30 AM', status: 'completed', items: ['Coffee', 'Sandwich'], selectedOption: 'done', timer: 4 },
    { id: '002', table: '03', time: '10:45 AM', status: 'in-progress', items: ['Pasta', 'Salad', 'Soda'], selectedOption: 'take-away', timer: 4 },
    { id: '003', table: '05', time: '11:00 AM', status: 'pending', items: ['Pizza', 'Beer'], selectedOption: 'dine-in', timer: 4 },
    { id: '004', table: '02', time: '11:15 AM', status: 'completed', items: ['Burger', 'Fries'], selectedOption: 'done', timer: 4 },
    { id: '005', table: '07', time: '11:30 AM', status: 'in-progress', items: ['Steak', 'Wine'], selectedOption: 'dine-in', timer: 4 },
    { id: '006', table: '04', time: '11:45 AM', status: 'pending', items: ['Sushi', 'Tea'], selectedOption: 'take-away', timer: 4 },
    { id: '007', table: '08', time: '12:00 PM', status: 'completed', items: ['Ramen', 'Gyoza', 'Green Tea'], selectedOption: 'done', timer: 4 },
    { id: '008', table: '10', time: '12:15 PM', status: 'in-progress', items: ['Curry', 'Rice', 'Mango Lassi'], selectedOption: 'take-away', timer: 4 },
    { id: '009', table: '06', time: '12:30 PM', status: 'pending', items: ['Tacos', 'Nachos', 'Margarita'], selectedOption: 'dine-in', timer: 4 },
    { id: '010', table: '09', time: '12:45 PM', status: 'completed', items: ['Pancakes', 'Orange Juice'], selectedOption: 'done', timer: 4 }
  ]);
  
  
  const [openDropdown, setOpenDropdown] = useState(null);
  
  
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => {
          if (order.selectedOption === 'dine-in' && order.timer > 0) {
            return { ...order, timer: order.timer - 1 };
          }
          return order;
        })
      );
    }, 60000); 
    
    return () => clearInterval(timerInterval);
  }, []);
  
  
  const toggleDropdown = (orderId) => {
    if (openDropdown === orderId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(orderId);
    }
  };
  
  
  const handleOptionSelect = (orderId, option) => {
    console.log(`Order ${orderId}: Selected ${option}`);
    
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, selectedOption: option, timer: 4 } : order
    ));
    setOpenDropdown(null);
  };
  
  
  const getOptionStatusText = (option, timer) => {
    switch(option) {
      case 'dine-in':
        return `Ongoing: ${timer > 0 ? timer : 0} mins`;
      case 'take-away':
        return 'Not picked up';
      case 'done':
        return 'Served';
      default:
        return '';
    }
  };
  
  
  const getDarkerColor = (hexColor) => {
    
    hexColor = hexColor.replace('#', '');
    
    
    let r = parseInt(hexColor.substr(0, 2), 16);
    let g = parseInt(hexColor.substr(2, 2), 16);
    let b = parseInt(hexColor.substr(4, 2), 16);
    
    
    r = Math.max(0, Math.floor(r * 0.7));
    g = Math.max(0, Math.floor(g * 0.7));
    b = Math.max(0, Math.floor(b * 0.7));
    
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  
  const getStatusInfo = (status) => {
    switch(status) {
      case 'completed':
        return { text: 'Completed', color: '#34C759', bgColor: '#31FF65', icon: checkIcon }; 
      case 'in-progress':
        return { text: 'In Progress', color: '#FF9500', bgColor: '#FDC474', icon: hourGlassIcon }; 
      case 'pending':
        return { text: 'Pending', color: '#FF3B30', bgColor: '#FF9B97', icon: hourGlassIcon }; 
      default:
        return { text: 'Unknown', color: '#8E8E93', bgColor: '#C7C7CC', icon: null }; 
    }
  };
  
  return (
    <div className="orderline-container">
      <div className="orderline-header">
        <h2>
          <img src={forkIcon} alt="Fork" className="fork-icon" />
          Order Line
        </h2>
      </div>
      
      <div className="orders-list">
        {orders.map(order => {
          const statusInfo = getStatusInfo(order.status);
          const darkerColor = getDarkerColor(statusInfo.color);
          const optionStatusText = getOptionStatusText(order.selectedOption, order.timer);
          
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
                    Order #{order.id}
                  </div>
                  <div className="dropdown-container">
                    <button 
                      className="dropdown-button-box"
                      onClick={() => toggleDropdown(order.id)}
                      style={{ 
                        backgroundColor: statusInfo.bgColor,
                        borderColor: darkerColor
                      }}
                    >
                      <div className="dropdown-button-content">
                        <div 
                          className="dropdown-option-text"
                          style={{ color: darkerColor }}
                        >
                          {order.selectedOption}
                        </div>
                        <div className="dropdown-status-text">{optionStatusText}</div>
                      </div>
                    </button>
                    {openDropdown === order.id && (
                      <div className="dropdown-menu">
                        <div 
                          className="dropdown-item"
                          onClick={() => handleOptionSelect(order.id, 'dine-in')}
                        >
                          <div className="dropdown-item-content">
                            <div>Dine-in</div>
                            <div className="dropdown-item-status">Ongoing: 4 mins</div>
                          </div>
                        </div>
                        <div 
                          className="dropdown-item"
                          onClick={() => handleOptionSelect(order.id, 'take-away')}
                        >
                          <div className="dropdown-item-content">
                            <div>Take away</div>
                            <div className="dropdown-item-status">Not picked up</div>
                          </div>
                        </div>
                        <div 
                          className="dropdown-item"
                          onClick={() => handleOptionSelect(order.id, 'done')}
                        >
                          <div className="dropdown-item-content">
                            <div>Done</div>
                            <div className="dropdown-item-status">Served</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="order-details">
                  <div className="order-table-time">
                    <div className="table-info">
                      <span className="detail-label">Table:</span>
                      <span className="detail-value">{order.table}</span>
                    </div>
                    <div className="time-info">
                      <span className="detail-label">Time:</span>
                      <span className="detail-value">{order.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-bottom-box">
                <div className="items-container">
                  <div className="items-label">1 x Value set meals</div>
                  <div className="items-list-vertical" style={{ paddingLeft: '20px' }}>
                    {order.items.map((item, index) => {
                      
                      const count = order.items.filter(i => i === item).length;
                      
                      const isFirstOccurrence = order.items.indexOf(item) === index;
                      
                      if (isFirstOccurrence) {
                        return (
                          <div key={index} className="item-row">
                            <span className="item-name">{count > 1 ? `${count} x ${item}` : `1 x ${item}`}</span>
                          </div>
                        );
                      }
                      return null;
                    }).filter(Boolean)}
                  </div>
                </div>
              </div>
              
              <div className="status-container">
                <div 
                  className="order-status"
                  style={{ backgroundColor: statusInfo.color }}
                >
                  {statusInfo.icon && <img src={statusInfo.icon} alt={statusInfo.text} className="status-icon" />}
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