import { useState } from "react";
import { useWebSocket } from "context/WebSocketProvider";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "components/Overview/Header";
import SendIcon from '@mui/icons-material/Send';
import { PaymentLink } from "types/Checkout";
import "./Checkout.css";

interface CheckoutProps {
    paymentLink: PaymentLink;
    isCheckedOut: boolean
}

const Checkout = ({ paymentLink, isCheckedOut }: CheckoutProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(isCheckedOut);
    const { socket } = useWebSocket();
    socket.on("payment.updated", (data) => {
        setIsLoading(false);
        setIsDisabled(true);
    })
    return (
    <Card className="card">
        <Header icon={<ShoppingCartCheckoutIcon />} title="Checkout your reservation" />
        <CardContent className="paymentContent">
            {isLoading ?
            <LoadingButton
                variant="contained"
                loading={isLoading}
                endIcon={<SendIcon />}
                loadingPosition="end"
                disabled
            >

                Waiting payment...
            </LoadingButton>:
            <Button variant="contained" disabled={isDisabled} onClick={() => {
                setIsLoading(true);
                window.open(paymentLink.url, "_blank")}}>Checkout</Button>}
        </CardContent>
    </Card>);
};


export default Checkout;
