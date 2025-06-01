import React, { useState, useRef, useEffect } from 'react';
import deleteIcon from '../assets/delete.png';
import chairIcon from '../assets/chair.png';
import './Tables.css';


const API_URL = 'http://localhost:5000/api';


const Tables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const [newTableCustomers, setNewTableCustomers] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const popupRef = useRef(null);
  const addButtonRef = useRef(null);

  
  const fetchTables = async () => {
    try {
      setLoading(true);
      console.log('Fetching tables from:', `${API_URL}/tables`);
      const response = await fetch(`${API_URL}/tables`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tables: ${response.status}`);
      }
      
      const text = await response.text();
      console.log('Response text:', text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        throw new Error('Invalid JSON response from server');
      }
      
      // Sort tables by ID
      const sortedTables = data.sort((a, b) => {
        return parseInt(a.id) - parseInt(b.id);
      });
      
      setTables(sortedTables);
      setError(null);
    } catch (err) {
      console.error('Error fetching tables:', err);
      setError('Failed to load tables. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      try {
        const response = await fetch(`${API_URL}/tables/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            setError(`Table ${id} not found.`);
          } else {
            throw new Error('Failed to delete table');
          }
          return;
        }
        
        setTables(tables.filter(table => table.id !== id));
        setError(null);
      } catch (err) {
        console.error('Error deleting table:', err);
        setError('Failed to delete table. Please try again.');
      }
    }
  };

  const handleAddTable = async () => {
    // Allow empty table name, generate a random ID if not provided
    let id;
    if (!newTableName.trim()) {
      // Find the highest table number and add 1
      const tableNumbers = tables.map(table => parseInt(table.id, 10));
      const maxTableNumber = tableNumbers.length > 0 ? Math.max(...tableNumbers) : 0;
      id = String(maxTableNumber + 1).padStart(2, '0');
    } else {
      id = newTableName.padStart(2, '0');
    }
    
    try {
      console.log('Creating table:', { id, customers: parseInt(newTableCustomers, 10) });
      const response = await fetch(`${API_URL}/tables`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          customers: parseInt(newTableCustomers, 10)
        }),
      });
      
      console.log('Create table response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        if (response.status === 400) {
          setError(`Table ${id} already exists`);
        } else {
          throw new Error(`Failed to add table: ${errorText}`);
        }
        return;
      }
      
      const newTable = await response.json();
      console.log('New table created:', newTable);
      setTables([...tables, newTable]);
      setNewTableName('');
      setNewTableCustomers(0);
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      console.error('Error adding table:', err);
      setError(`Failed to add table: ${err.message}`);
    }
  };

  const handleClickOutside = (e) => {
    if (showAddForm && popupRef.current && !popupRef.current.contains(e.target) && !addButtonRef.current.contains(e.target)) {
      setShowAddForm(false);
    }
  };
  
  const handleRefresh = () => {
    fetchTables();
  };

  const filteredTables = tables.filter(table => 
    table.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tables-container" onClick={handleClickOutside}>
      <div className="tables-header-container">
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
          <button className="refresh-button" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading-message">Loading tables...</div>
      ) : (
        <div className="tables-grid">
          {filteredTables.length > 0 ? (
            filteredTables.map((table) => (
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
            ))
          ) : (
            <div className="no-tables-message">
              No tables found. Add a table or refresh to see default tables.
            </div>
          )}
          
          <div className="add-table-card" onClick={() => setShowAddForm(true)} ref={addButtonRef}>
            <div className="add-icon">+</div>
          </div>
        </div>
      )}
      
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
              <h3>Table name (optional)</h3>
            </div>
            
            <div className="popup-content">
              <div className="form-group">
                <input
                  type="text"
                  id="tableName"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  placeholder="Enter table name or leave blank for auto-numbering"
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