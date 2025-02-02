import React, { createContext, useContext, useReducer, useEffect } from "react";
import AuthService from "../api/services/authService";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    validateSession();
  }, []);

  const login = async (credentials) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await AuthService.login(credentials);
      if (data.user) {
        document.cookie = `token=${data.token}; path=/; HttpOnly`;
        dispatch({ type: "LOGIN_SUCCESS", payload: { user: data.user } });
      } else {
        throw new Error(data.message || "Login failed due to server error");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error; 
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const logout = async () => {
    try {
      const data = await AuthService.logout();
      if (data.success) {
        document.cookie = "token=; path=/; max-age=0"; 
        dispatch({ type: "LOGOUT" });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const validateSession = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await AuthService.validateSession();
      if (data.user) {
        dispatch({ type: "LOGIN_SUCCESS", payload: { user: data.user } });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      console.error("Authentication verification failed:", error);
      dispatch({ type: "LOGOUT" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, validateSession }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
