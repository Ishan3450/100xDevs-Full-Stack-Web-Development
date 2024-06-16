import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { lazy } from "react";
import { Suspense } from "react";
// import Header from "./components/Header";
// import Landing from "./components/Landing";
// import Dashboard from "./components/Dashboard";

/*
 * Here is the Lazy loading applied from React.lazy()

 * What it does is process only the needed code at a time like on first only the landing page will be processed then if user route to other pages needed code will be rendered and processed
 */
const Header = lazy(() => import("./components/Header"));
const Landing = lazy(() => import("./components/Landing"));
const Dashboard = lazy(() => import("./components/Dashboard"));

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            // Suspense is an api provided by react which is used on asynchronous components during the time of loading of that components what to display.
            <Suspense fallback={"loading..."}>
              <Landing />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={"loading..."}>
              <Dashboard />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
