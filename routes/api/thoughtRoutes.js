const router = require("express").Router();

const { 
    getThoughts,
    getThoughtById,
    createThought,
 } = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);
router.route("/:thoughtId").get(getThoughtById);

module.exports = router;
