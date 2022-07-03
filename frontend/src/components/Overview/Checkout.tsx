import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "components/Overview/Header";
import { PaymentLink } from "types/Checkout";

interface CheckoutProps {
    paymentLink: PaymentLink;
}

const Checkout = ({ paymentLink }: CheckoutProps) => (
    <Card className="card">
        <Header icon={<ShoppingCartCheckoutIcon />} title="Checkout your reservation" />
        <CardContent>
            <Button variant="contained" onClick={() => {
                window.open(paymentLink.url, "_blank")}}>Pay</Button>
        </CardContent>
    </Card>
);


export default Checkout;
