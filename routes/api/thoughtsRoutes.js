const router = require('express').Router();
const{
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReactions,
    deleteReaction
} = require('../../controllers/thoughtsController')

router.route('/').get(getThoughts).post(createThought)

router.route('/:_id').get(getSingleThought).put(updateThought).delete(deleteThought)

router.route('/:_id/reactions').put(addReactions).delete(deleteReaction)

module.exports = router;