// src/components/AdminRestaurantControl.js
import React, { useState } from 'react';
import AddRestaurantForm from './AddRestaurantForm';
import RestaurantList from './RestaurantList';

const AdminRestaurantControl = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRestaurantAdded = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="admin-control-container">
      <h2>Admin Control: Manage Restaurants</h2>
      <p>Use the form below to add a new restaurant to the system. The list at the bottom displays all current restaurants and allows you to delete them.</p>
      <hr />
      <AddRestaurantForm onRestaurantAdded={handleRestaurantAdded} />
      <hr />
      <RestaurantList key={refreshKey} hideAddForm={true} />
    </div>
  );
};

export default AdminRestaurantControl;
