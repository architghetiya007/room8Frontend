import { RouteObject, useRoutes } from "react-router-dom";
import React, { lazy } from "react";
import SuspenseWrapper from "../components/Layout/SuspenseWrapper";
import GuestLayout from "../components/Layout/GuestLayout";
import ProtectedRoute from "../guard/ProtectedRoute";
// Lazy load your page components
const HomePage = lazy(() => import("../pages/HomePage"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const LandlordQuiz = lazy(() => import("../pages/LanlordQuiz"));
const LanlordPreviewPage = lazy(() => import("../pages/LanlordPreviewPage"));
const HunterPage = lazy(() => import("../pages/HunterPage"));
const HunterPreviewPage = lazy(() => import("../pages/HunterPreviewPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const ReserPasswordPage = lazy(() => import("../pages/ResetPasswordPage"));
const UserProfilePage = lazy(() => import("../pages/UserProfilePage"));
const EmailVerifyPage = lazy(() => import("../pages/EmailVerifyPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <SuspenseWrapper>
        <GuestLayout>
          <HomePage />
        </GuestLayout>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/search",
    element: (
      <SuspenseWrapper>
        <GuestLayout>
          <SearchPage />
        </GuestLayout>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/landlord",
    element: (
      <SuspenseWrapper>
        <GuestLayout>
          <LandlordQuiz />
        </GuestLayout>
      </SuspenseWrapper>
    ),
  },
  {
    path: "lanlord-preview",
    element: (
      <SuspenseWrapper>
        <GuestLayout>
          <LanlordPreviewPage />
        </GuestLayout>
      </SuspenseWrapper>
    ),
  },
  {
    path: "hunter",
    element: (
      <SuspenseWrapper>
        <GuestLayout>
          <HunterPage />
        </GuestLayout>
      </SuspenseWrapper>
    ),
  },
  {
    path: "hunter-preview",
    element: (
      <SuspenseWrapper>
        <GuestLayout>
          <HunterPreviewPage />
        </GuestLayout>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/aboutus",
    element: (
      <SuspenseWrapper>
        <GuestLayout>
          <AboutUs />
        </GuestLayout>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/contactus",
    element: (
      <SuspenseWrapper>
        <GuestLayout>
          <ContactUs />
        </GuestLayout>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/profile",
    element: <ProtectedRoute />, // Protect this route
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <GuestLayout>
              <UserProfilePage />
            </GuestLayout>
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "/reset-password/:token",
    element: (
      <SuspenseWrapper>
        <ReserPasswordPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/verify-email/:id",
    element: (
      <SuspenseWrapper>
        <EmailVerifyPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "*",
    element: (
      <SuspenseWrapper>
        <NotFoundPage />
      </SuspenseWrapper>
    ),
  },
];

const Routes: React.FC = () => {
  return useRoutes(routes);
};

export default Routes;
