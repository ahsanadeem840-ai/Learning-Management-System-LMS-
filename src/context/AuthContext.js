"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";

const AuthContext = createContext({
  user: null,
  userData: null,
  loading: true,
  signUpWithEmail: async () => {},
  signInWithEmail: async () => {},
  signInWithGoogle: async () => {},
  logoutUser: async () => {},
  isMock: false
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to fetch user data from Firestore
  const fetchUserData = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch (error) {
      console.error("Error fetching user data from Firestore:", error);
    }
    return null;
  };

  useEffect(() => {
    if (!isFirebaseConfigured) {
      // --- FALLBACK MOCK AUTHENTICATION SYSTEM ---
      const checkMockAuth = () => {
        const savedUser = localStorage.getItem("lms_mock_user");
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          setUser({ uid: parsed.uid, email: parsed.email, displayName: parsed.name });
          setUserData(parsed);
        } else {
          setUser(null);
          setUserData(null);
        }
        setLoading(false);
      };
      
      checkMockAuth();
      window.addEventListener("lms_mock_auth_changed", checkMockAuth);
      return () => window.removeEventListener("lms_mock_auth_changed", checkMockAuth);
    }

    // --- REAL FIREBASE AUTHENTICATION SYSTEM ---
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const data = await fetchUserData(firebaseUser.uid);
        if (data) {
          setUserData(data);
        } else {
          // If auth user exists but Firestore profile isn't populated, create placeholder
          const placeholder = {
            name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
            email: firebaseUser.email,
            role: firebaseUser.email.includes("instructor") ? "instructor" : "student",
            createdAt: new Date().toISOString()
          };
          setUserData(placeholder);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // SignUp function
  const signUpWithEmail = async (email, password, name, role) => {
    setLoading(true);
    try {
      if (!isFirebaseConfigured) {
        // Mock register
        const mockUid = "mock_uid_" + Math.random().toString(36).substr(2, 9);
        const newMockUser = {
          uid: mockUid,
          name,
          email,
          role,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem("lms_mock_user", JSON.stringify(newMockUser));
        window.dispatchEvent(new Event("lms_mock_auth_changed"));
        return { user: { uid: mockUid, email }, userData: newMockUser };
      }

      // Real Firebase Register
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const createdUser = userCredential.user;
      
      const profile = {
        uid: createdUser.uid,
        name,
        email,
        role,
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, "users", createdUser.uid), profile);
      setUser(createdUser);
      setUserData(profile);
      return { user: createdUser, userData: profile };
    } catch (error) {
      console.error("SignUp error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // SignIn function
  const signInWithEmail = async (email, password) => {
    setLoading(true);
    try {
      if (!isFirebaseConfigured) {
        // Mock login
        const savedUser = localStorage.getItem("lms_mock_user");
        if (savedUser) {
          const registeredUser = JSON.parse(savedUser);
          if (registeredUser.email.toLowerCase() === email.toLowerCase()) {
            setUser({ uid: registeredUser.uid, email: registeredUser.email, displayName: registeredUser.name });
            setUserData(registeredUser);
            window.dispatchEvent(new Event("lms_mock_auth_changed"));
            return { user: { uid: registeredUser.uid, email: registeredUser.email, displayName: registeredUser.name }, userData: registeredUser };
          } else {
            const err = new Error("Account not found");
            err.code = "auth/user-not-found";
            throw err;
          }
        } else {
          // If no user is registered, check against default preset seeds
          const isInstructor = email.toLowerCase().includes("instructor");
          const defaultEmail = isInstructor ? "alex.rivers@lms.studio" : "ahsanadeem840@gmail.com";
          const defaultName = isInstructor ? "Alex Rivers" : "Muhammad Ahsan";
          
          if (email.toLowerCase() === defaultEmail.toLowerCase()) {
            const mockUser = {
              uid: isInstructor ? "mock_uid_instructor" : "mock_uid_student",
              name: defaultName,
              email: defaultEmail,
              role: isInstructor ? "instructor" : "student",
              createdAt: new Date().toISOString()
            };
            localStorage.setItem("lms_mock_user", JSON.stringify(mockUser));
            setUser({ uid: mockUser.uid, email: mockUser.email, displayName: mockUser.name });
            setUserData(mockUser);
            window.dispatchEvent(new Event("lms_mock_auth_changed"));
            return { user: { uid: mockUser.uid, email: mockUser.email, displayName: mockUser.name }, userData: mockUser };
          } else {
            const err = new Error("Account not found");
            err.code = "auth/user-not-found";
            throw err;
          }
        }
      }

      // Real Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const signedInUser = userCredential.user;
      const data = await fetchUserData(signedInUser.uid);
      
      setUser(signedInUser);
      if (data) {
        setUserData(data);
      }
      return { user: signedInUser, userData: data };
    } catch (error) {
      console.error("SignIn error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google SignIn
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      if (!isFirebaseConfigured) {
        // Mock Google sign-in as student
        const mockGoogleUser = {
          uid: "mock_google_uid",
          name: "Muhammad Ahsan",
          email: "ahsanadeem840@gmail.com",
          role: "student",
          createdAt: new Date().toISOString()
        };
        localStorage.setItem("lms_mock_user", JSON.stringify(mockGoogleUser));
        window.dispatchEvent(new Event("lms_mock_auth_changed"));
        return { user: { uid: mockGoogleUser.uid, email: mockGoogleUser.email }, userData: mockGoogleUser };
      }

      // Real Google Sign-in
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const signedInUser = userCredential.user;
      
      // Check if user document already exists, if not create one
      let data = await fetchUserData(signedInUser.uid);
      if (!data) {
        data = {
          uid: signedInUser.uid,
          name: signedInUser.displayName || "Google Learner",
          email: signedInUser.email,
          role: "student", // default to student for Google sign-in
          createdAt: serverTimestamp()
        };
        await setDoc(doc(db, "users", signedInUser.uid), data);
      }
      
      setUser(signedInUser);
      setUserData(data);
      return { user: signedInUser, userData: data };
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logoutUser = async () => {
    setLoading(true);
    try {
      if (!isFirebaseConfigured) {
        localStorage.removeItem("lms_mock_user");
        window.dispatchEvent(new Event("lms_mock_auth_changed"));
        setUser(null);
        setUserData(null);
        return;
      }
      await signOut(auth);
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      loading,
      signUpWithEmail,
      signInWithEmail,
      signInWithGoogle,
      logoutUser,
      isMock: !isFirebaseConfigured
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
