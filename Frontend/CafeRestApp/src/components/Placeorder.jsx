import React, { useState, useRef, useEffect } from 'react';
import './Placeorder.css';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../assets/search.png';
import locationIcon from '../assets/location.png';
import deliveryIcon from '../assets/delivery.png';
import burger1 from '../assets/burger1.png';
import pizza2 from '../assets/pizza2.png';
import drink6 from '../assets/drink6.png';

const Placeorder = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('dine-in'); 
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const sliderRef = useRef(null);
  const [showInstructionsPopup, setShowInstructionsPopup] = useState(false);
  const [cookingInstructions, setCookingInstructions] = useState('');
  
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: 'Cheese Burger', quantity: 1, price: 399, image: burger1, prepTime: 15 },
    { id: 2, name: 'Pepperoni Pizza', quantity: 1, price: 599, image: pizza2, prepTime: 20 },
    { id: 3, name: 'Green Apple Mojito', quantity: 2, price: 249, image: drink6, prepTime: 8 }
  ]);
  
  const subtotal = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryCharge = deliveryMethod === 'takeaway' ? 50 : 0; 
  const tax = subtotal * 0.05; 
  const total = subtotal + deliveryCharge + tax;
  
  const calculateDeliveryTime = () => {
    const baseTime = 15;
    const additionalTime = orderItems.reduce((time, item) => {
      return time + (item.prepTime * item.quantity);
    }, 0);
    return Math.min(baseTime + additionalTime, 120);
  };
  
  const deliveryTime = calculateDeliveryTime();
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleQuantityChange = (id, change) => {
    setOrderItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change); 
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  
  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };
  
  const handleInstructionsClick = () => {
    setShowInstructionsPopup(true);
  };

  const handleClosePopup = () => {
    setShowInstructionsPopup(false);
  };

  const handleSaveInstructions = () => {
    setShowInstructionsPopup(false);
  };
  
  const handleMouseDown = (e) => {
    e.preventDefault(); 
    setIsDragging(true);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const maxPosition = sliderRect.width - 40; 
    
    let clientX;
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    const relativeX = clientX - sliderRect.left;
    const newPosition = Math.min(Math.max(0, relativeX), maxPosition);
    const percentPosition = (newPosition / maxPosition) * 100;
    
    setDragPosition(percentPosition);
    
    if (percentPosition >= 95) {
      handlePlaceOrder();
      setIsDragging(false);
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    
    if (dragPosition < 95) {
      setDragPosition(0);
    }
  };
  
  useEffect(() => {
    const handleMove = (e) => handleMouseMove(e);
    const handleUp = () => handleMouseUp();
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleUp);
    } else {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleUp);
    }
  }, [isDragging]);
  
  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    navigate('/orderline');
  };
  
  return (
    <div className="placeorder-container">
      
      {showInstructionsPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={handleClosePopup}>×</button>
            <h3>Add Cooking Instructions</h3>
            <textarea
              className="instructions-textarea"
              value={cookingInstructions}
              onChange={(e) => setCookingInstructions(e.target.value)}
            ></textarea>
            <p className="instructions-disclaimer">The restaurant will try its best to follow your request. However refunds or cancellations in this regard won't be possible</p>
            <div className="popup-buttons">
              <button 
                className="popup-cancel"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
              <button 
                className="popup-save"
                onClick={handleSaveInstructions}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`content-wrapper ${showInstructionsPopup ? 'blur-background' : ''}`}>
        <div className="menu-header">
          <div className="greeting-container">
            <h1 className="greeting-text">Place Order</h1>
            <p className="greeting-subtext">Review your order and place it</p>
          </div>
          <div className="custom-search-container">
            <div className="custom-search-input-wrapper">
              <img src={searchIcon} alt="Search" className="custom-search-icon" />
              <input
                type="text"
                placeholder="Search for food items..."
                className="custom-search-input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        
        <div className="order-section">
          <h3>Order Summary</h3>
          <div className="order-items">
            {orderItems.map(item => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <div className="item-price-qty">
                    <span className="item-price">₹{item.price}</span>
                    <div className="item-quantity-control">
                      <button 
                        className="qty-btn qty-minus" 
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        className="qty-btn qty-plus" 
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div 
            className="cooking-instructions-container"
            onClick={handleInstructionsClick}
          >
            <span className="cooking-instructions-text">Add cooking instructions (optional)</span>
          </div>
          
          <div className="delivery-toggle-container">
            <div className="delivery-toggle">
              <button 
                className={`toggle-btn ${deliveryMethod === 'dine-in' ? 'active' : ''}`}
                onClick={() => handleDeliveryMethodChange('dine-in')}
              >
                Dine-in
              </button>
              <button 
                className={`toggle-btn ${deliveryMethod === 'takeaway' ? 'active' : ''}`}
                onClick={() => handleDeliveryMethodChange('takeaway')}
              >
                Takeaway
              </button>
            </div>
          </div>
          
          <div className="order-totals">
            <div className="total-row">
              <span>Item total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="total-row">
              <span>Delivery time</span>
              <span>{deliveryTime} mins</span>
            </div>
            {deliveryMethod === 'takeaway' && (
              <div className="total-row">
                <span>Delivery charge</span>
                <span>₹{deliveryCharge}</span>
              </div>
            )}
            <div className="total-row">
              <span>Tax (5%)</span>
              <span>₹{Math.round(tax)}</span>
            </div>
            <div className="total-row grand-total">
              <span className="grand-total-label">Grand total</span>
              <span>₹{Math.round(total)}</span>
            </div>
          </div>
        </div>
        
        <div className="user-details-section">
          <h3 className="details-heading">Your Details</h3>
          <div className="user-info">
            <p className="user-name-phone">Rahul Sharma • +91 9876543210</p>
            <div className="address-line">
              <img src={locationIcon} alt="Location" className="icon location-icon" />
              <span className="address-text">123 MG Road, Bangalore, Karnataka 560001</span>
            </div>
            <div className="delivery-time-line">
              <img src={deliveryIcon} alt="Delivery" className="icon delivery-icon" />
              <span className="delivery-text">Delivery in {deliveryTime} mins</span>
            </div>
          </div>
        </div>
        
        <div className="swipe-order-container">
          <div 
            className="swipe-slider" 
            ref={sliderRef}
          >
            <div 
              className="swipe-thumb" 
              style={{ left: `${dragPosition}%` }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              <span className="swipe-icon">→</span>
            </div>
            <div className="swipe-track"></div>
            <div className="swipe-text">Swipe to order</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeorder;