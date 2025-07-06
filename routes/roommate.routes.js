import express from 'express';
import * as controller from '../controllers/roommate.controller.js';

const router = express.Router();

router.get('/', controller.getAllRoommates);
router.post('/', controller.createRoommate);
router.get('/all-items', controller.getAllItems);
router.get('/trending', controller.getTrendingRoommates);
router.get('/my-listings', controller.getMyListings);
router.get('/search-suggestions', controller.getSearchSuggestions);
router.get('/:id', controller.getRoommateById);
router.put('/:id', controller.updateRoommate);
router.delete('/:id', controller.deleteRoommate);
router.patch('/:id/like', controller.likeRoommate);

export default router;
