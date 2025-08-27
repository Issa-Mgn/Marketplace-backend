const express = require("express");
const router = express.Router();
const imagekitAuthController = require("../controllers/imagekitAuthController");

// Route pour obtenir les paramètres d'authentification ImageKit
router.get("/", imagekitAuthController.getAuthParams);

module.exports = router;
