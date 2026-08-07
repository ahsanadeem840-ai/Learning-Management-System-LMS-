import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  writeBatch 
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { coursesData } from "@/data/courses";

// Helper to seed courses list to Firestore if they do not exist
export const seedCoursesIfEmpty = async () => {
  if (!isFirebaseConfigured) return;
  try {
    const querySnapshot = await getDocs(collection(db, "courses"));
    if (querySnapshot.empty) {
      console.log("Seeding courses to Firestore...");
      const batch = writeBatch(db);
      coursesData.forEach((course) => {
        const docRef = doc(db, "courses", course.id);
        batch.set(docRef, course);
      });
      await batch.commit();
      console.log("Seeding complete.");
    }
  } catch (error) {
    console.error("Error seeding courses to Firestore:", error);
  }
};

// Fetch all courses
export const getCourses = async () => {
  if (!isFirebaseConfigured) {
    return coursesData;
  }
  try {
    await seedCoursesIfEmpty();
    const querySnapshot = await getDocs(collection(db, "courses"));
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    return list.length > 0 ? list : coursesData;
  } catch (error) {
    console.error("Error getting courses from Firestore:", error);
    return coursesData;
  }
};

// Fetch user stats (minutes, streak, enrolled courses list)
export const getUserStats = async (uid) => {
  if (!isFirebaseConfigured || !uid) {
    // Return stats from localStorage
    const savedCourses = localStorage.getItem("lms_enrolled_courses");
    const enrolled = savedCourses ? JSON.parse(savedCourses) : ["nextjs15", "uiuxfigma"];
    const minutes = localStorage.getItem("lms_study_time") || "180";
    const streak = localStorage.getItem("lms_study_streak") || "5";
    return {
      enrolledCourses: enrolled,
      studyTime: parseInt(minutes),
      studyStreak: parseInt(streak)
    };
  }

  try {
    const docRef = doc(db, "userStats", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Create initial stats document
      const initialStats = {
        userId: uid,
        enrolledCourses: ["nextjs15", "uiuxfigma"],
        studyTime: 180,
        studyStreak: 5,
        lastActive: new Date().toISOString()
      };
      await setDoc(docRef, initialStats);
      return initialStats;
    }
  } catch (error) {
    console.error("Error getting user stats from Firestore:", error);
    return {
      enrolledCourses: ["nextjs15", "uiuxfigma"],
      studyTime: 180,
      studyStreak: 5
    };
  }
};

// Update user stats
export const updateUserStats = async (uid, newStats) => {
  if (!isFirebaseConfigured || !uid) {
    if (newStats.enrolledCourses) {
      localStorage.setItem("lms_enrolled_courses", JSON.stringify(newStats.enrolledCourses));
    }
    if (newStats.studyTime !== undefined) {
      localStorage.setItem("lms_study_time", newStats.studyTime.toString());
    }
    if (newStats.studyStreak !== undefined) {
      localStorage.setItem("lms_study_streak", newStats.studyStreak.toString());
    }
    window.dispatchEvent(new Event("lms_progress_updated"));
    window.dispatchEvent(new Event("lms_enrollment_updated"));
    return;
  }

  try {
    const docRef = doc(db, "userStats", uid);
    await setDoc(docRef, { 
      ...newStats, 
      lastActive: new Date().toISOString() 
    }, { merge: true });
    
    window.dispatchEvent(new Event("lms_progress_updated"));
    window.dispatchEvent(new Event("lms_enrollment_updated"));
  } catch (error) {
    console.error("Error updating user stats in Firestore:", error);
  }
};

// Fetch user completed lessons map for a course
export const getUserCompletedLessons = async (uid, courseId) => {
  if (!isFirebaseConfigured || !uid) {
    const saved = localStorage.getItem("lms_completed_lessons");
    const map = saved ? JSON.parse(saved) : {};
    return map[courseId] || [];
  }

  try {
    const docRef = doc(db, "userProgress", `${uid}_${courseId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().completedLessons || [];
    }
  } catch (error) {
    console.error("Error getting user progress from Firestore:", error);
  }
  return [];
};

// Update user completed lessons
export const updateUserCompletedLessons = async (uid, courseId, lessonsList) => {
  if (!isFirebaseConfigured || !uid) {
    const saved = localStorage.getItem("lms_completed_lessons");
    const map = saved ? JSON.parse(saved) : {};
    map[courseId] = lessonsList;
    localStorage.setItem("lms_completed_lessons", JSON.stringify(map));
    window.dispatchEvent(new Event("lms_progress_updated"));
    return;
  }

  try {
    const docRef = doc(db, "userProgress", `${uid}_${courseId}`);
    await setDoc(docRef, {
      userId: uid,
      courseId,
      completedLessons: lessonsList,
      lastUpdated: new Date().toISOString()
    }, { merge: true });
    window.dispatchEvent(new Event("lms_progress_updated"));
  } catch (error) {
    console.error("Error updating user progress in Firestore:", error);
  }
};

// Seed default submissions for mock environment
const getMockSubmissions = () => {
  const saved = localStorage.getItem("lms_submissions");
  if (saved) return JSON.parse(saved);
  
  const defaults = [
    {
      id: "sub_1",
      studentName: "Muhammad Ahsan",
      studentId: "mock_uid_12345",
      courseId: "nextjs15",
      course: "Next.js 15 Masterclass",
      assignmentId: "nextjs15_a2",
      assignment: "Module 2: Custom Layout Structure",
      date: "Jul 29, 2026",
      fileName: "layout-source-v2.zip",
      status: "Pending Review",
      grade: null,
      feedback: "",
      comments: "Attached is my zip containing the layout.js and sidebar collapsible components."
    },
    {
      id: "sub_2",
      studentName: "John Smith",
      studentId: "student_smith",
      courseId: "reactbasics",
      course: "React Fundamental Course",
      assignmentId: "reactbasics_a1",
      assignment: "Module 1 Quiz: Hooks & Context API",
      date: "Jul 27, 2026",
      fileName: "react-quiz-answers.pdf",
      status: "Graded",
      grade: 92,
      feedback: "Great work explaining context updates and handling cleanups in useEffect hook. Keep it up!",
      comments: "Answers to the quiz questions in the PDF."
    },
    {
      id: "sub_3",
      studentName: "Sarah Jenkins",
      studentId: "student_jenkins",
      courseId: "nextjs15",
      course: "Next.js 15 Masterclass",
      assignmentId: "nextjs15_a1",
      assignment: "Module 1: Server Actions & Form validation",
      date: "Jul 25, 2026",
      fileName: "form-action-submission.js",
      status: "Pending Review",
      grade: null,
      feedback: "",
      comments: "Finished the server actions with validation logic."
    }
  ];
  localStorage.setItem("lms_submissions", JSON.stringify(defaults));
  return defaults;
};

// Fetch submissions
export const getSubmissions = async (uid, role = "student") => {
  if (!isFirebaseConfigured || !uid) {
    const list = getMockSubmissions();
    if (role === "instructor") {
      return list;
    }
    // Filter student's submissions (mock studentName is Muhammad Ahsan)
    return list.filter(sub => sub.studentId === uid || sub.studentName === "Muhammad Ahsan");
  }

  try {
    let q;
    if (role === "instructor" || role === "admin") {
      q = query(collection(db, "submissions"), orderBy("date", "desc"));
    } else {
      q = query(
        collection(db, "submissions"), 
        where("studentId", "==", uid),
        orderBy("date", "desc")
      );
    }
    const querySnapshot = await getDocs(q);
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    return list;
  } catch (error) {
    console.error("Error getting submissions from Firestore:", error);
    // Fallback to empty list or local mock
    return [];
  }
};

// Add or update submission
export const saveSubmission = async (submission) => {
  if (!isFirebaseConfigured) {
    const list = getMockSubmissions();
    const subId = submission.id || "sub_" + Math.random().toString(36).substr(2, 9);
    const newSub = {
      id: subId,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      ...submission,
    };
    
    const index = list.findIndex(s => s.id === newSub.id || (s.studentName === newSub.studentName && s.assignmentId === newSub.assignmentId));
    if (index > -1) {
      list[index] = { ...list[index], ...newSub };
    } else {
      list.push(newSub);
    }
    localStorage.setItem("lms_submissions", JSON.stringify(list));
    window.dispatchEvent(new Event("lms_submissions_updated"));
    return newSub;
  }

  try {
    const data = {
      ...submission,
      date: submission.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      lastUpdated: serverTimestamp()
    };

    if (submission.id) {
      const docRef = doc(db, "submissions", submission.id);
      await setDoc(docRef, data, { merge: true });
      window.dispatchEvent(new Event("lms_submissions_updated"));
      return { id: submission.id, ...data };
    } else {
      // Create new submission
      const docRef = await addDoc(collection(db, "submissions"), data);
      window.dispatchEvent(new Event("lms_submissions_updated"));
      return { id: docRef.id, ...data };
    }
  } catch (error) {
    console.error("Error saving submission in Firestore:", error);
    throw error;
  }
};

// Update user profile in users collection
export const updateUserProfile = async (uid, profileData) => {
  if (!isFirebaseConfigured) {
    const saved = localStorage.getItem("lms_mock_user");
    const mockUser = saved ? JSON.parse(saved) : {};
    const updated = { ...mockUser, ...profileData };
    localStorage.setItem("lms_mock_user", JSON.stringify(updated));
    window.dispatchEvent(new Event("lms_mock_auth_changed"));
    return updated;
  }

  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, profileData, { merge: true });
    return profileData;
  } catch (error) {
    console.error("Error updating user profile in Firestore:", error);
    throw error;
  }
};
