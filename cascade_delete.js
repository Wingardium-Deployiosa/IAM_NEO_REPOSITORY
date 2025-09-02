const https = require('https');

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: responseData }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function deleteMario() {
  try {
    // Get all reservations
    const reservationsRes = await makeRequest({
      hostname: 'ide-dfdaccffbaeccdbcacadadfbbcbbebfbde.premiumproject.examly.io',
      path: '/proxy/8080/api/reservations',
      method: 'GET'
    });
    
    const reservations = JSON.parse(reservationsRes.data);
    const marioReservations = reservations.filter(r => r.restaurantId === 15);
    
    console.log(`Found ${marioReservations.length} reservations for Mario's restaurant`);
    
    // Delete all reservations for Mario's restaurant
    for (const reservation of marioReservations) {
      const deleteRes = await makeRequest({
        hostname: 'ide-dfdaccffbaeccdbcacadadfbbcbbebfbde.premiumproject.examly.io',
        path: `/proxy/8080/api/reservations/${reservation.id}`,
        method: 'DELETE'
      });
      console.log(`Deleted reservation ${reservation.id}: ${deleteRes.status}`);
    }
    
    // Wait a moment for database consistency
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Now delete the restaurant
    const restaurantDeleteRes = await makeRequest({
      hostname: 'ide-dfdaccffbaeccdbcacadadfbbcbbebfbde.premiumproject.examly.io',
      path: '/proxy/8080/api/restaurants/15',
      method: 'DELETE'
    });
    
    console.log(`Restaurant delete status: ${restaurantDeleteRes.status}`);
    console.log(`Response: ${restaurantDeleteRes.data}`);
    
    if (restaurantDeleteRes.status === 204 || restaurantDeleteRes.status === 200) {
      console.log('✅ Restaurant "Mario" deleted successfully');
    } else {
      console.log('❌ Failed to delete restaurant "Mario"');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

deleteMario();