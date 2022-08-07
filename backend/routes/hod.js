const express = require("express");
const router = express.Router();

const {
    getAllFaculty,
    getAllPublications,
    getPublicationsByYear,
    getPublicationsByFaculty,
    getPublicationByFacultyAndYear
} = require("../controllers/hod");

const {
    isAuthenticated,
    isHod
} = require("../middleware/auth");



router.route('/all-faculty').get(isAuthenticated, isHod, getAllFaculty)
router.route('/all-publications').get(isAuthenticated, isHod, getAllPublications)
router.route('/publications-by-year').get(isAuthenticated, isHod, getPublicationsByYear)
router.route('/publications-by-faculty/:id').get(isAuthenticated, isHod, getPublicationsByFaculty)
router.route('/publications-by-faculty-and-year').get(isAuthenticated, isHod, getPublicationByFacultyAndYear)

module.exports = router;