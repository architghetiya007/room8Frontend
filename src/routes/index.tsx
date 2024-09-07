import { RouteObject, useRoutes } from "react-router-dom";
import React, { lazy } from "react";
import SuspenseWrapper from "../components/Layout/SuspenseWrapper";
import GuestLayout from "../components/Layout/GuestLayout";
// Lazy load your page components
const HomePage = lazy(() => import("../pages/HomePage"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const LandlordQuiz = lazy(() => import("../pages/LanlordQuiz"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const ReserPasswordPage = lazy(() => import("../pages/ResetPasswordPage"));

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
    path: "/landlordQuiz",
    element: (
      <SuspenseWrapper>
        <GuestLayout>
          <LandlordQuiz />
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
    path: "/reset-password/:token",
    element: <ReserPasswordPage />,
  },
];

const Routes: React.FC = () => {
  return useRoutes(routes);
};

export default Routes;
