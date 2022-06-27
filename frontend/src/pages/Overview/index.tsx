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
import "./index.css";
import Summary from "components/Overview/Summary";
import NoBookingFound from "components/Overview/NoBookingFound";
import InviteLogin from "components/Auth/InviteLogin";
import { getBooking } from "api/customer";

interface GetBookingQuery {
  booking: Booking;
  teamMember: TeamMember;
  relatedObjects: Array<CatalogObject>;
  objects: Array<CatalogObjectItemVariation>;
  paymentLink: PaymentLink;
}

const Overview = () => {
  const {
    isLoading: isAuthLoading,
    isAuthenticated,
    user,
  } = useAuth0<{ name: string }>();

  const { bookingId } = useParams();
  const isBookingQueryEnabled = !!user && !!bookingId;
  const getBookingId = () => (!!bookingId ? bookingId : "");

  const { isLoading, isSuccess, isError, data, error } = useQuery<
    GetBookingQuery,
    AxiosError
  >("customer/booking", () => getBooking(getBookingId()), {
    enabled: isBookingQueryEnabled,
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
    const { booking, teamMember, objects, relatedObjects, paymentLink } = data;
    return (
      <Summary
        booking={booking}
        teamMember={teamMember}
        objects={objects}
        relatedObjects={relatedObjects}
        paymentLink={paymentLink}
      />
    );
  }
  return <NoBookingFound title="No booking yet!" />;
};

export default Overview;
