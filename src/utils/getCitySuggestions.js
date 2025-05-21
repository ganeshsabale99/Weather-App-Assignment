export const getCitySuggestions = async (cityName) => {
  try {
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityName}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'YOUR_API_KEY_HERE',  // <-- Replace with your RapidAPI key
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      }
    );

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    // Return the array of city objects safely
    return data.data || [];
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return []; // Return empty array on error to avoid crashes
  }
};
