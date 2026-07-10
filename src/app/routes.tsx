import { createBrowserRouter, Navigate } from "react-router";
import Root from "./layouts/Root";
import CameraPage from "./pages/camera";
import DevicesPage from "./pages/devices";
import RoomsPage from "./pages/rooms";
import HistoryPage from "./pages/history";
import EventsPage from "./pages/events";
import StreamingPage from "./pages/streaming";
import UsersPage from "./pages/users";
import SettingsPage from "./pages/settings";
import DashboardPage from "./pages/dashboard";
import ReportsPage from "./pages/reports";
import AnalyticsPage from "./pages/analytics";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "camera",  Component: CameraPage },
      { path: "devices", Component: DevicesPage },
      { path: "rooms",   Component: RoomsPage },
      { path: "history", Component: HistoryPage },
      { path: "events",  Component: EventsPage },
      { path: "stream",  Component: StreamingPage },
      { path: "users",    Component: UsersPage },
      { path: "settings",   Component: SettingsPage },
      { path: "dashboard",  Component: DashboardPage },
      { path: "reports",    Component: ReportsPage },
      { path: "analytics",  Component: AnalyticsPage },
      { path: "*",       element: <Navigate to="/camera" replace /> },
    ],
  },
]);
