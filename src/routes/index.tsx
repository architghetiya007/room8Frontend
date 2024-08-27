import { RouteObject, useRoutes } from "react-router-dom";
import React, { lazy } from "react";
import SuspenseWrapper from "../components/Layout/SuspenseWrapper";
// Lazy load your page components
const HomePage = lazy(() => import("../pages/HomePage"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <SuspenseWrapper>
        <HomePage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/aboutus",
    element: (
      <SuspenseWrapper>
        <AboutUs />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/contactus",
    element: (
      <SuspenseWrapper>
        <ContactUs />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: (
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        ),
      },
      {
        path: "register",
        element: (
          <SuspenseWrapper>
            <Register />
          </SuspenseWrapper>
        ),
      },
    ],
  },
];

const Routes: React.FC = () => {
  return useRoutes(routes);
};

export default Routes;
