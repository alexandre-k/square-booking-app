import { useState } from "react";
import { useWebSocket } from "context/WebSocketProvider";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DoneIcon from "@mui/icons-material/Done";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Header from "components/Overview/Header";
import SendIcon from "@mui/icons-material/Send";
import Skeleton from "@mui/material/Skeleton";
import { PaymentLink } from "types/Checkout";
import { BaseMoney, LineItem, Order, OrderState } from "types/Order";
import { getMoneyAsCurrency } from "utils/service";
import "./Checkout.css";

interface CheckoutProps {
  isLoading: boolean;
  order: Order;
  paymentLink: PaymentLink;
  isCheckedOut: boolean;
  setShowConfirmationDialog: (show: true) => void;
}

interface MoneyLineProps {
  name: string;
  money: BaseMoney;
  important: boolean;
}

const MoneyLine = ({ name, money, important }: MoneyLineProps) => (
  <Stack direction="row" justifyContent="space-between">
    <Typography
      style={{ fontWeight: important ? "bold" : "" }}
      color="text.secondary"
    >
      {name}
    </Typography>
    <Typography style={{ fontWeight: important ? "bold" : "" }}>
      {getMoneyAsCurrency(money.amount, money.currency)}
    </Typography>
  </Stack>
);

MoneyLine.defaultProps = {
  important: false,
};

const Checkout = ({
  isLoading,
  order,
  paymentLink,
  isCheckedOut,
  setShowConfirmationDialog,
}: CheckoutProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(isCheckedOut);
  const { socket } = useWebSocket();
  socket.on("order.updated", (data) => {
    // console.log(data, order)
    // if (data.id === order.id) {
    setIsCheckingOut(false);
    setIsDisabled(true);
    setShowConfirmationDialog(true);
    //}
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

  const isOrderCompleted = (order: Order) =>
    order.state === OrderState.COMPLETED;

  return (
    <Card className="card">
      <Header
        icon={<ShoppingCartCheckoutIcon />}
        title="Checkout your reservation"
      />
      <CardContent className="paymentContent">
        <Typography>Order</Typography>
        <List>
          {order.lineItems.map((lineItem: LineItem) => (
            <ListItem key={lineItem.uid}>
              <Box sx={{ width: "100%" }}>
                <MoneyLine name={lineItem.name} money={lineItem.totalMoney} />
              </Box>
            </ListItem>
          ))}
        </List>
        <MoneyLine name="Subtotal" money={order.totalMoney} />
        <MoneyLine name="Taxes" money={order.totalTaxMoney} />
        <Divider style={{ margin: "1em" }} />
        <MoneyLine name="Total" money={order.totalMoney} important={true} />
      </CardContent>
      {isOrderCompleted(order) ? (
        <CardContent className="paymentContent">
          <Button color="success" variant="contained" endIcon={<DoneIcon />}>
            Payment completed
          </Button>
        </CardContent>
      ) : (
        <CardContent className="paymentContent">
          {isCheckingOut ? (
            <LoadingButton
              variant="contained"
              loading={isCheckingOut}
              endIcon={<SendIcon />}
              loadingPosition="end"
              disabled
            >
              Waiting payment...
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              disabled={isDisabled}
              onClick={() => {
                setIsCheckingOut(true);
                window.open(paymentLink.url, "_blank");
              }}
            >
              Checkout
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default Checkout;
