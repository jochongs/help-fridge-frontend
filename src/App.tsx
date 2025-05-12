import { Route, Routes } from "react-router-dom";
import MainPage from "./page/MainPage";
import LoginPage from "./page/LoginPage/page";
import SignUpPage from "./page/SignUpPage/page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
