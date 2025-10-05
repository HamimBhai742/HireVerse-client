import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./Layout/Root/Root.jsx";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import AllJobs from "./Pages/AllJobs/AllJobs.jsx";
import Registration from "./Pages/Register/Register.jsx";
import AddJob from "./Pages/AddJob/AddJob.jsx";
import BidRequests from "./Pages/BidRequest/BidRequest.jsx";
import MyBids from "./Pages/MyBid/MyBid.jsx";
import MyPostedJobs from "./Pages/MyPostedJob/MyPostedJob.jsx";
import JobDetails from "./Pages/JobDetails/JobDetails.jsx";
import UpdateJob from "./Pages/UpdateJob/UpdateJob.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorPage from "./Pages/Error/ErrorPage.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<Home />} />
              <Route path="/all-jobs" element={<AllJobs />} />
              <Route path="/add-job" element={<AddJob />} />
              <Route path="/bid-requests" element={<BidRequests />} />
              <Route path="/my-bids" element={<MyBids />} />
              <Route path="/my-posted-jobs" element={<MyPostedJobs />} />
              <Route path="/job-details/:id" element={<JobDetails />} />
              <Route path="/update-job/:id" element={<UpdateJob />} />
              <Route path="/bid-requests" element={<BidRequests />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>{" "}
    </QueryClientProvider>
  </StrictMode>
);
