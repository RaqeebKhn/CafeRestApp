
import React, { useState, useRef, useEffect } from 'react';
import deleteIcon from '../assets/delete.png';
import chairIcon from '../assets/chair.png';
import './Tables.css';

const Tables = () => {
  const [tables, setTables] = useState([
    { id: '01', customers: 0 },
    { id: '02', customers: 0 },
    { id: '03', customers: 0 },
    { id: '04', customers: 0 },
    { id: '05', customers: 0 },
    { id: '06', customers: 0 },
    { id: '07', customers: 0 },
    { id: '08', customers: 0 },
    { id: '09', customers: 0 },
    { id: '10', customers: 0 },
    { id: '11', customers: 0 },
    { id: '12', customers: 0 },
    { id: '13', customers: 0 },
    { id: '14', customers: 0 },
    { id: '15', customers: 0 },
    { id: '16', customers: 0 },
    { id: '17', customers: 0 },
    { id: '18', customers: 0 },
    { id: '19', customers: 0 },
    { id: '20', customers: 0 },
  ]);
  
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const [newTableCustomers, setNewTableCustomers] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const popupRef = useRef(null);
  const addButtonRef = useRef(null);

  useEffect(() => {
    if (showAddForm) {
      document.body.classList.add('popup-open');
    } else {
      document.body.classList.remove('popup-open');
    }
    
    return () => {
      document.body.classList.remove('popup-open');
    };
  }, [showAddForm]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      const tableExists = tables.find(table => table.id === id);
      
      if (!tableExists) {
        setError(`Table ${id} not found.`);
        return;
      }
      
      setTables(tables.filter(table => table.id !== id));
      setError(null);
    }
  };

  const handleAddTable = () => {
    if (!newTableName.trim()) {
      setError('Table name is required');
      return;
    }

    const id = newTableName.padStart(2, '0');
    
    if (tables.some(table => table.id === id)) {
      setError(`Table ${id} already exists`);
      return;
    }
    const newTable = {
      id,
      customers: parseInt(newTableCustomers, 10)
    };

    setTables([...tables, newTable]);
    
    setNewTableName('');
    setNewTableCustomers(0);
    setShowAddForm(false);
    setError(null);
  };

  const handleClickOutside = (e) => {
    if (showAddForm && popupRef.current && !popupRef.current.contains(e.target) && !addButtonRef.current.contains(e.target)) {
      setShowAddForm(false);
    }
  };

  const filteredTables = tables.filter(table => 
    table.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tables-container" onClick={handleClickOutside}>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="   Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="tables-header">
        <h2>Tables</h2>
      </div>
      
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="tables-grid">
        {filteredTables.map((table) => (
          <div key={table.id} className="table-card">
            <div className="table-content">
              <div className="table-header">
                <div className="table-number-container">
                  <span className="table-text">Table</span>
                  <span className="table-number">{table.id}</span>
                </div>
                <div className="table-actions">
                  <button 
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(table.id);
                    }}
                  >
                    <img src={deleteIcon} alt="Delete" className="delete-icon" />
                  </button>
                </div>
              </div>
            </div>
            <div className="table-customers">
              <img src={chairIcon} alt="Chair" className="chair-icon" />
              <span>{table.customers}</span>
            </div>
          </div>
        ))}
        
        
        <div className="add-table-card" onClick={() => setShowAddForm(true)} ref={addButtonRef}>
          <div className="add-icon">+</div>
        </div>
      </div>

      
      {showAddForm && (
        <div className="popup-overlay" onClick={handleClickOutside}>
          <div 
            className="add-table-popup" 
            ref={popupRef} 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: addButtonRef.current ? addButtonRef.current.getBoundingClientRect().top + 'px' : '0',
              left: addButtonRef.current ? (addButtonRef.current.getBoundingClientRect().left + addButtonRef.current.offsetWidth + 10) + 'px' : '0'
            }}
          >
            <div className="popup-header">
              <h3>Table name(optional)</h3>
            </div>
            
            <div className="popup-content">
              <div className="form-group">
                <input
                  type="text"
                  id="tableName"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  placeholder="Enter table name"
                  className="dotted-input"
                />
              </div>
              
              <div className="form-group chair-group">
                <label htmlFor="tableCustomers">Chair</label>
                <select
                  id="tableCustomers"
                  value={newTableCustomers}
                  onChange={(e) => setNewTableCustomers(e.target.value)}
                  className="chair-dropdown"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="popup-footer">
              <button className="create-button" onClick={handleAddTable}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;