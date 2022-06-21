import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
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
            <iframe width="100%" src={paymentLink.url + "&output=embed"}></iframe>
        </CardContent>
    </Card>
);


export default Checkout;
