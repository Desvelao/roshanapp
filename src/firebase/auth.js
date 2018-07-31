import { auth } from './firebase';

// Sign In
export const login = (email, password) => auth.signInWithEmailAndPassword(email, password);

export const logout = () => auth.signOut()
