/*
Copyright 2021 Square Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const Booking = require("../models/Booking");
const dateHelpers = require("../util/date-helpers");
const express = require("express");
const JSONBig = require("json-bigint");
const router = express.Router();
const { customersApi } = require("../util/square-client");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const locationId = process.env["SQUARE_LOCATION_ID"];

/**
 * Convert a duration in milliseconds to minutes
 *
 * @param {*} duration - duration in milliseconds
 * @returns {Number} - duration in minutes
 */
function convertMsToMins(duration) {
  return Math.round(Number(duration) / 1000 / 60);
}

/**
 * Return the id of a customer that matches the firstName, lastName and email
 * If such customer doesn't exist, create a new customer.
 *
 * @param {string} givenName
 * @param {string} familyName
 * @param {string} emailAddress
 */
async function getCustomerID(givenName, familyName, emailAddress) {
  const {
    result: { customers },
  } = await customersApi.searchCustomers({
    query: {
      filter: {
        emailAddress: {
          exact: emailAddress,
        },
      },
    },
  });

  if (customers && customers.length > 0) {
    const matchingCustomers = customers.filter(
      (customer) =>
        customer.givenName === givenName && customer.familyName === familyName
    );

    // If a matching customer is found, return the first matching customer
    if (matchingCustomers.length > 0) {
      return matchingCustomers[0].id;
    }
  }

  // If no matching customer is found, create a new customer and return its ID
  const {
    result: { customer },
  } = await customersApi.createCustomer({
    emailAddress,
    familyName,
    givenName,
    idempotencyKey: uuidv4(),
    referenceId: "BOOKINGS-SAMPLE-APP",
  });

  return customer.id;
}

/**
 * GET /customers/search
 *
 * Get customerId
 */
router.post("/search", async (req, res, next) => {
  const { givenName, familyName, emailAddress } = req.body;
  const customerId = await getCustomerID(givenName, familyName, emailAddress);
  res.send({ customerId });
});

/**
 * GET /customer/booking
 *
 * Get availability for the service variation & team member of the
 * existing booking so the user can reschedule the booking
 */
router.get("/booking", async (req, res, next) => {
    console.log('BOOKING >')
    try {
        // const {
        //     result: { availabilities },
        // } = await bookingsApi.searchAvailability(req.body);
        // res.send(JSONBig.parse(JSONBig.stringify({ availabilities })));
        const email = req.query['email'];
        if (email) {
            const bookings = await Booking.findOne({ email });
            return res.send(bookings);
        } else {
            throw('Requires an email query parameter found!');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

/**
 * POST /customer/booking
 *
 * Get availability for the service variation & team member of the
 * existing booking so the user can reschedule the booking
 */
router.post("/booking", async (req, res, next) => {
    try {
        const booking = new Booking({
            email: req.body.email,
            customerId: req.body.customerId,
            orderId: req.body.orderId,
            bookingId: req.body.bookingId,
            status: req.body.status,
        })
        await booking.save();
        return res.send(booking);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
