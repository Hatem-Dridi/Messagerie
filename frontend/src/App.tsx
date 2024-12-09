import { useContext, lazy, Suspense } from "react"
import { Route, Routes, Navigate } from "react-router-dom"

import AuthContext from "./contexts/AuthContext"
import LandingPage from "./pages/LandingPage";
import Loading from "./components/Loading";
import backgroundImage from "./assets/background.jpg";


function App() {

  const { state } = useContext(AuthContext);

  const { user } = state;

  const Home = lazy(() => import("./pages/Home"));
  const Login = lazy(() => import("./pages/auth/Login"));
  const Register = lazy(() => import("./pages/auth/Register"));
  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh", // Adjust the height as needed
      width: "100%",   // Adjust the width as needed
    }}>
      <Routes>
        <Route index path="/" element={!user ? <LandingPage /> : <Navigate to="/home" />} />

        <Route path="/home" element={
          <Suspense fallback={<Loading />}>
            { user ? <Home /> : <Navigate to="/login" /> }
          </Suspense> 
        } />

        <Route path="/login" element={
          <Suspense fallback={<Loading />}>
            { !user ? <Login /> : <Navigate to="/home" /> }
          </Suspense> 
        } />

        <Route path="/register" element={
          <Suspense fallback={<Loading />}>
            { !user ? <Register /> : <Navigate to="/home" /> }
          </Suspense> 
        } />
      </Routes>
    </div>
  )
}

export default App
