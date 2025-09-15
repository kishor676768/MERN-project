import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StudentRegistration from "./Student_registration/student.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StudentRegistration />
 </StrictMode>
);
