
import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase';

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    set({ isLoading: true });
    if (!uid) {
      // console.log("No UID provided, clearing user state");
      set({ currentUser: null, isLoading: false });
      return;
    }
    try {
      // console.log("Fetching user info for UID:", uid);
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("User document found:", docSnap.data());
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        // console.log("No user document found for UID:", uid);
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.log("Error fetching user info:", err);
      set({ currentUser: null, isLoading: false });
    }
  },
}));
