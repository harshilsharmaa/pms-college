const express = require("express");
const router = express.Router();

const {
    register,
    login,
    logout,
    myProfile,
    updateProfile,
    updatePassword,
    deleteAccount,

    addpublication,
    getPublicationById,
    myPublications,
    editPublication,
    deletePublication,

    deleteAllData
} = require("../controllers/user");

const {
    isAuthenticated
} = require("../middleware/auth");

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/profile').get(isAuthenticated, myProfile)
router.route('/profile/update').put(isAuthenticated, updateProfile)
router.route('/password/update').put(isAuthenticated, updatePassword)
router.route('/delete/account').delete(isAuthenticated, deleteAccount)

router.route('/add/publication').post(isAuthenticated, addpublication)
router.route('/publication/:id').get(isAuthenticated, getPublicationById)
router.route('/my/publications').get(isAuthenticated, myPublications)
router.route('/edit/publication/:id').put(isAuthenticated, editPublication)
router.route('/delete/publication/:id').delete(isAuthenticated, deletePublication)



// For development only
router.route('/delete').delete(deleteAllData)

module.exports = router;