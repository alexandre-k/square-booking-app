import React from "react";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "components/Loading";
import { Booking } from "types/Booking";
import { TeamMember } from "types/Team";
import { PaymentLink } from "types/Checkout";
import { CatalogObject, CatalogObjectItemVariation } from "types/Catalog";
import "./Summary.css";
import Summary from "components/Overview/Summary";
import NoBookingFound from "components/Overview/NoBookingFound";
import InviteLogin from "components/Auth/InviteLogin";
import { getBookingList } from "api/customer";

interface GetBookingListQuery {
  bookings: Array<Booking>;
}

const BookingList = () => {
  const {
    isLoading: isAuthLoading,
    isAuthenticated,
    user,
  } = useAuth0<{ name: string }>();

  const getUserName = () => (!!user ? user.name : "");

  const { isLoading, isSuccess, isError, data, error } = useQuery<
    GetBookingListQuery,
    AxiosError
  >("customer/bookings", () => getBookingList(getUserName()), {
    enabled: !!user,
  });

  if (!isAuthenticated && !isAuthLoading) {
    return <InviteLogin />;
  }

  if (isLoading || isAuthLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <NoBookingFound
        title="Check your internet connection..."
        text={error.message}
      />
    );
  }
  if (isSuccess) {
    const { bookings } = data;
    return (
      <>
        {bookings.map((booking) => (
          <div>{booking.id}</div>
        ))}
      </>
    );
  }
  return <NoBookingFound title="No booking yet!" />;
};

BookingList.default.prop;

export default BookingList;
