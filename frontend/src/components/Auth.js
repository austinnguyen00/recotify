import { useState, useEffect } from 'react';

const Auth = () => {
  let [authenticated, setAuthenticated] = useState(false);

  // var getAuthenticated = async () => {
  //   let at_response = await fetch('/spotify/is-access-token-valid');
  //   let at_data = at_response.json();
  //   if (!at_data.status) {
  //     let rt_response = await fetch('/spotify/is--token-valid');
  //     let rt_data = rt_response.json();
  //     if (!rt_data.status) {
  //       let response = await fetch('/spotify/get-auth-url');
  //       let data = await response.json();
  //       window.location.replace(data.url);
  //     }
  //   } else {
  //     setAuthenticated(true);
  //   }

  useEffect(() => {
    const getAuthenticated = async () => {
      const response = await fetch('/spotify/is-access-token-valid');
      const data = await response.json();
      // console.log('Auth data: ', data);
      setAuthenticated(data.status);
      sessionStorage.setItem('auth', data.status);
    };

    getAuthenticated();
  }, [authenticated]);

  // console.log('Authenticated:', authenticated);

  let auth = sessionStorage.getItem('auth')
    ? sessionStorage.getItem('auth')
    : null;
  // console.log('Auth after:', auth);
  // console.log('Type of auth after:', typeof auth);

  return (
    <div>
      {true ? (
        <p>User is authenticated</p>
      ) : (
        <div>
          <p>User is not authenticated</p>
          <button>Click me bitch</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
