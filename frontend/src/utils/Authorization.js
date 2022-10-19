export const Authorization = async () => {
  const response = await fetch('spotify/get-auth-url');
  const data = await response.json();
  console.log('data:', data);
  window.location.replace(data.url); // open the link to spotify authorization
};
