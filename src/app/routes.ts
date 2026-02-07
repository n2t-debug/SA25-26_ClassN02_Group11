import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CreateOrderPage } from "./pages/CreateOrderPage";
import { TrackOrderPage } from "./pages/TrackOrderPage";
import { CODManagementPage } from "./pages/CODManagementPage";
import { FindLocationPage } from "./pages/FindLocationPage";
import { PromotionsPage } from "./pages/PromotionsPage";
import { DriverPage } from "./pages/DriverPage";
import { DriverHistoryPage } from "./pages/DriverHistoryPage";
import { DriverEarningsPage } from "./pages/DriverEarningsPage";
import { LookupPage } from "./pages/LookupPage";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  // Customer routes
  {
    path: "/create-order",
    Component: CreateOrderPage,
  },
  {
    path: "/track",
    Component: TrackOrderPage,
  },
  {
    path: "/cod",
    Component: CODManagementPage,
  },
  {
    path: "/locations",
    Component: FindLocationPage,
  },
  {
    path: "/promotions",
    Component: PromotionsPage,
  },
  // Driver routes
  {
    path: "/driver",
    Component: DriverPage,
  },
  {
    path: "/driver/history",
    Component: DriverHistoryPage,
  },
  {
    path: "/driver/earnings",
    Component: DriverEarningsPage,
  },
  // Admin routes
  {
    path: "/admin",
    Component: AdminPage,
  },
  // Public routes
  {
    path: "/lookup",
    Component: LookupPage,
  },
]);