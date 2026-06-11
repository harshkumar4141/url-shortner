const { nanoid } = require("nanoid");
const Url = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortID = nanoid(8);

  await Url.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", {
    id: shortID,
  });
}

async function handleRedirectToOriginalUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    {
      shortId,
    },
    { $push: { visitHistory: { timestamp: Date.now() } } },
  );
  res.redirect(entry.redirectUrl);
}

async function handleGetUrlStats(req, res) {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId });
  res.json({
    totalClicks: result.visitHistory.length,
    visitHistory: result.visitHistory,
  });
}

async function handleDeleteByShortId(req, res) {
  const shortId = req.params.shortId;
  const url = await Url.findOneAndDelete({ shortId });
  if (!url) return res.status(404).send("NOT FOUND");
  return res.send(`${url.shortId} successful deleted`);
}

module.exports = {
  handleGenerateNewShortUrl,
  handleRedirectToOriginalUrl,
  handleGetUrlStats,
  handleDeleteByShortId,
};


