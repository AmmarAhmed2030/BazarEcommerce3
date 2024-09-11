export async function getData(endpoint) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      cache: 'no-store', // This disables caching
    });

    // Check if the response is successful
    if (!response.ok) {
      console.log(`Failed to fetch ${endpoint}: ${response.statusText}`);
      return []; // Return an empty array if fetch fails
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching data from ${endpoint}:`, error);
    return []; // Return an empty array on error
  }
}
