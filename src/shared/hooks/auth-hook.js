import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDateLowerScope = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);     //---> 1 Hour, in congruence with the backend !
    setTokenExpirationDate(tokenExpirationDateLowerScope);
    localStorage.setItem(
      'userData', 
      JSON.stringify({
        userId: uid, 
        token: token, 
        expiration: tokenExpirationDateLowerScope.toISOString()      //---> ISOString to ensure no data is lost when Date gets stringified !
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if(token && tokenExpirationDate){
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    }else{
      clearTimeout(logoutTimer);       //----> clever use of timeouts
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {                  //---> remember useEffect always runs after the rendering cycle !!!
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
      login(storedData.userId, storedData.token, new Date(storedData.expiration));              // Crucial for AutoLogin !!
    }
  }, [login]);

  return {token, login, logout, userId};
};