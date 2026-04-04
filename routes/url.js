const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleRedirectToOriginalUrl,
  handleGetUrlStats,
  handleDeleteByShortId
} = require("../controllers/url");
const router = express.Router();

router
  .post("/", handleGenerateNewShortUrl)
  .get("/:shortId", handleRedirectToOriginalUrl)
  .get("/:shortId/stats", handleGetUrlStats)
  .delete("/:shortId", handleDeleteByShortId);

  
module.exports = router;
