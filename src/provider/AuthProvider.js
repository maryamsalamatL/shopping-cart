import { useState, useContext, createContext, useEffect } from "react";

const AuthProviderContext = createContext();
const AuthProviderContextDispatcher = createContext();

const LOCAL_STORAGE_AUTH_KEY = "authState";

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    const authState =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) || false;

    setState(authState);
  }, []);
  // useEffect(() => {
  //   const authState =
  //     JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) || false;
  //   console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)));
  //   setState(authState);
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(state));
  // }, [state]);

  return (
    <AuthProviderContext.Provider value={state}>
      <AuthProviderContextDispatcher.Provider value={setState}>
        {children}
      </AuthProviderContextDispatcher.Provider>
    </AuthProviderContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthProviderContext);
export const useAuthActions = () => useContext(AuthProviderContextDispatcher);
