const dateHelpers = require("../util/date-helpers");
const express = require("express");
const router = express.Router();
const { locationsApi } = require("../util/square-client");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const locationId = process.env["SQUARE_LOCATION_ID"];

/**
 * GET /location
 *
 * Get a location details.
 *
 */
router.get("/", async (req, res, next) => {
  try {
    const { result } = await locationsApi.retrieveLocation(locationId);
    return res.send(result.location);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
