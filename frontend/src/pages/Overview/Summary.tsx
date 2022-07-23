import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMagicLogin } from "context/MagicLoginProvider";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import Loading from "components/Loading";
import { Booking } from "types/Booking";
import { TeamMember } from "types/Team";
import { PaymentLink } from "types/Checkout";
import { Order } from "types/Order";
import {
  CatalogObject,
  CatalogObjectItemVariation,
  Service,
} from "types/Catalog";
import "./Summary.css";
import Summary from "components/Overview/Summary";
import NoBookingFound from "components/Overview/NoBookingFound";
import InviteLogin from "components/Auth/InviteLogin";
import { getBooking } from "api/customer";
import { useLocation } from "context/LocationProvider";
import { formatCatalogObjects } from "utils/service";

interface GetBookingQuery {
  booking: Booking;
  teamMember: TeamMember;
  relatedObjects: Array<CatalogObject>;
  objects: Array<CatalogObjectItemVariation>;
  paymentLink: PaymentLink;
  order: Order;
}

interface ServerError {
  code: string;
}

const BookingSummary = () => {
  const {
    isLoading: isAuthLoading,
    isAuthenticated,
    user,
    jwt,
  } = useMagicLogin();
  const navigate = useNavigate();
  const { isError: isLocationError, location } = useLocation();
  const { bookingId } = useParams();
  const [selectedMemberIds, setSelectedMemberIds] = useState<Array<string>>([]);
  const [selectedUTCStartAt, setSelectedUTCStartAt] = useState<string>(
    null as any
  );
  const [selectedServices, setSelectedServices] = useState<Array<Service>>([]);
  const [order, setOrder] = useState<Order>(null as any);

  const isBookingQueryEnabled = !!user && !!bookingId && !!jwt;
  const getBookingId = () => (!!bookingId ? bookingId : "");
  const getJwt = () => (!!jwt ? jwt : "");

  const { isLoading, isSuccess, isFetching, isPreviousData, data, error } =
    useQuery<GetBookingQuery, AxiosError<ServerError>>(
      ["customer/booking/" + bookingId],
      () => getBooking(getBookingId(), getJwt()),
      {
        onSuccess: (data) => {
          setSelectedMemberIds(data.teamMember ? [data.teamMember.id] : []);
          setSelectedUTCStartAt(data.booking.startAt);
          setSelectedServices(
            data.relatedObjects ? formatCatalogObjects(data.relatedObjects) : []
          );
          setOrder(data.order);
        },
        enabled: isBookingQueryEnabled,
      }
    );

  if (error?.response?.status === 410) {
    // if canceled redirect to listing
    navigate("/overview", { replace: true });
  }

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
    const errorData = error?.response?.data;
    if (!!errorData && "code" in errorData) {
      return <NoBookingFound title="Page expired. Please reload your tab." />;
    } else {
      return (
        <NoBookingFound
          title="Check your internet connection..."
          text={error.message}
        />
      );
    }
  }
  if (isSuccess && !!location) {
    const { booking, teamMember, objects, relatedObjects, paymentLink, order } =
      data;
    return (
      <Summary
        booking={booking}
        teamMember={teamMember}
        objects={objects}
        relatedObjects={relatedObjects}
        paymentLink={paymentLink}
        order={order}
        location={location}
        selectedMemberIds={selectedMemberIds}
        setSelectedMemberIds={setSelectedMemberIds}
        selectedUTCStartAt={selectedUTCStartAt}
        setSelectedUTCStartAt={setSelectedUTCStartAt}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        isFetching={isFetching}
      />
    );
  }
  return <NoBookingFound title="No booking yet!" />;
};

export default BookingSummary;
