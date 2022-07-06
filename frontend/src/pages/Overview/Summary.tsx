import React from "react";
import { useParams } from "react-router-dom";
import { useMagicLogin } from "context/MagicLoginProvider";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import Loading from "components/Loading";
import { Booking } from "types/Booking";
import { TeamMember } from "types/Team";
import { PaymentLink } from "types/Checkout";
import { CatalogObject, CatalogObjectItemVariation } from "types/Catalog";
import "./Summary.css";
import Summary from "components/Overview/Summary";
import NoBookingFound from "components/Overview/NoBookingFound";
import InviteLogin from "components/Auth/InviteLogin";
import { getBooking } from "api/customer";
import { useLocation } from "context/LocationProvider";

interface GetBookingQuery {
  booking: Booking;
  teamMember: TeamMember;
  relatedObjects: Array<CatalogObject>;
  objects: Array<CatalogObjectItemVariation>;
  paymentLink: PaymentLink;
}

const BookingSummary = () => {
    const { isLoading: isAuthLoading, isAuthenticated, user, jwt } =
        useMagicLogin();
  const {
    isLoading: isLocationLoading,
    isError: isLocationError,
    location
  } = useLocation();
  const { bookingId } = useParams();
  const isBookingQueryEnabled = !!user && !!bookingId && !!jwt;
  const getBookingId = () => (!!bookingId ? bookingId : "");
  const getJwt = () => (!!jwt ? jwt : "");

  const { isLoading, isSuccess, isError, data, error } = useQuery<
    GetBookingQuery,
    AxiosError
  >("customer/booking", () => getBooking(getBookingId(), getJwt()), {
    enabled: isBookingQueryEnabled,
  });

  if (isLocationError) {
    return <div>Location error. Unable to retrieve current location</div>;
  }

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
  if (isSuccess && !!location) {
    const { booking, teamMember, objects, relatedObjects, paymentLink } = data;
    return (
      <Summary
        booking={booking}
        teamMember={teamMember}
        objects={objects}
        relatedObjects={relatedObjects}
        paymentLink={paymentLink}
        location={location}
      />
    );
  }
  return <NoBookingFound title="No booking yet!" />;
};

export default BookingSummary;
