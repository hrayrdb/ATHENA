// store/index.js

import { proxy } from 'valtio';

// Define your application state
export const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
});

// Define user-related state using Valtio
export const userState = proxy({
    user: null,
    setUser: (userData) => {
        userState.user = userData;
    },
    clearUser: () => {
        userState.user = null;
    }
});
