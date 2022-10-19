import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  let auth = sessionStorage.getItem('auth')
    ? sessionStorage.getItem('auth')
    : null;

  // const getAuthenticated = async () => {
  //   const response = await fetch('/spotify/is-access-token-valid');
  //   const data = await response.json();
  //   console.log('Token data:', data);
  //   auth.token = data.status;
  // };

  // getAuthenticated();
  // console.log('Auth_token:', auth.token);

  return auth === 'true' ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoutes;
