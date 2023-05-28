import { AccountTypes } from "./common/account-types";
import AdProfile from "./therapisthub/AdProfile";
import Schedule from "./therapisthub/Schedule";
import IndividualSpace from "./therapisthub/IndividualSpace";
import Bookings from "./therapisthub/Bookings";
import Review from "./therapisthub/Review";
import Spaces from "./therapisthub/Spaces";
import SpaceProvider from "./physiotherapist/SpaceProvider/SpaceProvider";
import Dashboard from "./therapisthub/Dashboard";
import Booking from "./physiotherapist/Booking/Booking";
import Receipt from "./physiotherapist/Receipt/Receipt";
import GoogleCalender from "./physiotherapist/Receipt/GoogleCalender";
import BookingList from "./physiotherapist/BookingList/BookingList";
import Checkout from "./physiotherapist/Checkout/Checkout";
import GiveReview from "./mainLayout/GiveReview/GiveReview";
import HomeSlier from "./physiotherapist/Home/HomeSlier";
import DashboardAdmin from "./admin/DashboardAdmin";
import Transactions from "./admin/Transactions";
import ReviewManagement from "./admin/ReviewManagement";
import ContentManagement from "./admin/ContentManagement";
import AdminProfile from "./admin/AdminProfile";

export const physiotherapyConfig = [
  {
    route: "physiotherapy-hub/profile",
    access: [AccountTypes.Host, AccountTypes.Professional],
    Component: AdProfile,
  },
  {
    route: "physiotherapy-hub/spaces/schedule",
    access: [AccountTypes.Host, AccountTypes.Professional],
    Component: Schedule,
  },
  {
    route: "physiotherapy-hub/spaces/:id",
    access: [AccountTypes.Host, AccountTypes.Professional],
    Component: IndividualSpace,
  },
  {
    route: "physiotherapy-hub/review",
    access: [AccountTypes.Host, AccountTypes.Professional],
    Component: Review,
  },
  {
    route: "physiotherapy-hub/spaces",
    access: [AccountTypes.Host],
    Component: Spaces,
  },
  {
    route: "physiotherapy-hub/dashboard",
    access: [AccountTypes.Host, AccountTypes.Professional],
    Component: Bookings,
  },
  {
    route: "physiotherapy-hub/my-bookings",
    access: [AccountTypes.Host, AccountTypes.Professional],
    Component: Bookings,
  },
];

export const routeConfig = [
  {
    route: "list-center",
    Component: SpaceProvider,
  },
  {
    route: "booking",
    Component: Booking,
  },
  {
    route: "receipt/:id",
    access: [AccountTypes.Host, AccountTypes.Professional],
    Component: Receipt,
  },
  {
    route: "api/receipt/:id",
    access: [AccountTypes.Host, AccountTypes.Professional],
    Component: Receipt,
  },
  {
    route: "google-calender",
    access: [AccountTypes.Host, AccountTypes.Professional],
    Component: GoogleCalender,
  },
  {
    route: "booking-list",
    access: [AccountTypes.Host, AccountTypes.Professional],
    Component: BookingList,
  },
  {
    route: "checkout",
    access: [AccountTypes.Host, AccountTypes.Professional],
    Component: Checkout,
  },
  {
    route: "givereview",
    access: [AccountTypes.Host, AccountTypes.Professional],
    Component: GiveReview,
  },
  {
    route: "slider",
    access: [AccountTypes.Host, AccountTypes.Professional],
    Component: HomeSlier,
  },
  {
    route: "admin/dashboard",
    access: [AccountTypes.Host],
    Component: DashboardAdmin,
  },
  {
    route: "admin/transactions",
    access: [AccountTypes.Host],
    Component: Transactions,
  },
  {
    route: "admin/reviewmanagement",
    access: [AccountTypes.Host],
    Component: ReviewManagement,
  },
  {
    route: "admin/contentmanagement",
    access: [AccountTypes.Host],
    Component: ContentManagement,
  },
  {
    route: "admin/profile",
    access: [AccountTypes.Host],
    Component: AdminProfile,
  },
];
