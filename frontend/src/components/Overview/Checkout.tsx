import { useState } from "react";
import { useWebSocket } from "context/WebSocketProvider";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Header from "components/Overview/Header";
import SendIcon from '@mui/icons-material/Send';
import Skeleton from "@mui/material/Skeleton";
import { PaymentLink } from "types/Checkout";
import "./Checkout.css";

interface CheckoutProps {
    isLoading: boolean;
    paymentLink: PaymentLink;
    isCheckedOut: boolean
}

const Checkout = ({ isLoading, paymentLink, isCheckedOut }: CheckoutProps) => {
    const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(isCheckedOut);
    const { socket } = useWebSocket();
    socket.on("payment.updated", (data) => {
        setIsCheckingOut(false);
        setIsDisabled(true);
    });
    socket.on("order.updated", (data) => {
        setIsCheckingOut(false);
        setIsDisabled(true);
    });

    if (isLoading) {
        return (
            <Card className="card">
                <Stack spacing={1} alignContent="center">
                    <Skeleton variant="text" width={250} height={30} />
                    <Skeleton variant="rectangular" width={300} height={30} />
                </Stack>
            </Card>
        );
    }

    return (
    <Card className="card">
        <Header icon={<ShoppingCartCheckoutIcon />} title="Checkout your reservation" />
        <CardContent className="paymentContent">
            {isCheckingOut?
            <LoadingButton
                variant="contained"
                loading={isCheckingOut}
                endIcon={<SendIcon />}
                loadingPosition="end"
                disabled
            >

                Waiting payment...
            </LoadingButton>:
            <Button variant="contained" disabled={isDisabled} onClick={() => {
                setIsCheckingOut(true);
                window.open(paymentLink.url, "_blank")}}>Checkout</Button>}
        </CardContent>
    </Card>);
};


export default Checkout;
