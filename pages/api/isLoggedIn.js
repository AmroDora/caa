const checkUserLoggedIn = () => {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token); // Add this line to debug
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  export default checkUserLoggedIn;