import React from 'react';
import AddRestaurantForm from './AddRestaurantForm';
import RestaurantList from './RestaurantList';

const AdminRestaurantControl = () => {
  const handleRestaurantAdded = () => {
    // A simple way to refresh the restaurant list after a change
    window.location.reload();
  };

  return (
    <div className="admin-control-container">
      <h2>Admin Control: Manage Restaurants</h2>
      <p>Use the form below to add a new restaurant to the system. The list below allows you to manage existing restaurants.</p>
      <hr />
      <AddRestaurantForm onRestaurantAdded={handleRestaurantAdded} />
      <hr />
      <RestaurantList />
    </div>
  );
};

export default AdminRestaurantControl;

