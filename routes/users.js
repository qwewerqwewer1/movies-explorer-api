const router = require('express').Router();

const { getUser, patchUser } = require('../controllers/users');
const { validateGetUser, validatePatchUser } = require('../middlewares/validations');

router.get('/me', validateGetUser, getUser);
router.patch('/me', validatePatchUser, patchUser);

module.exports = router;
