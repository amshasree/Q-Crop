import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const USERS_STORAGE_KEY = 'q_farming_registered_users';
const CURRENT_USER_KEY = 'q_farming_active_user';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch (e) {
      console.error('Error persisting active user:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Error persisting users list:', e);
    }
  }, [users]);

  const register = ({ fullName, phone, email, state, district, password }) => {
    const existing = users.find((u) => u.phone === phone);
    if (existing) {
      return { success: false, message: 'A farmer account with this mobile number already exists.' };
    }

    const newUser = {
      id: `farmer_${Date.now()}`,
      fullName,
      phone,
      email: email || '',
      state,
      district,
      password, // In real backend, password will be hashed on server
      createdAt: new Date().toISOString()
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);

    // Auto-create initial farm profile for user
    const initialFarm = {
      state,
      district,
      villageOrPin: '',
      farmArea: '2.5',
      areaUnit: 'Acres',
      soilType: 'Alluvial Loam',
      irrigationMethod: 'Canal Irrigation',
      crop: 'Wheat (गेहूं)',
      variety: '',
      sowingDate: new Date().toISOString().split('T')[0],
      growthStage: 'Vegetative / CRI Stage'
    };
    localStorage.setItem('q_farming_my_farm_profile', JSON.stringify(initialFarm));

    return { success: true, user: newUser };
  };

  const login = ({ phone, password }) => {
    const user = users.find((u) => u.phone === phone && u.password === password);
    if (!user) {
      // Demo fallback check if first time testing
      if (phone === '9876543210' && password === 'farmer123') {
        const demoUser = {
          id: 'farmer_demo',
          fullName: 'Ramesh Singh (किसान)',
          phone: '9876543210',
          email: 'ramesh@kisan.in',
          state: 'Punjab',
          district: 'Ludhiana',
          createdAt: new Date().toISOString()
        };
        setCurrentUser(demoUser);
        return { success: true, user: demoUser };
      }
      return { success: false, message: 'Invalid mobile number or password.' };
    }

    setCurrentUser(user);
    return { success: true, user };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
