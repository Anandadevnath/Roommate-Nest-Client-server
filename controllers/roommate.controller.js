import Roommate from '../models/roommate.model.js';

export const createRoommate = async (req, res) => {
  try {
    const roommate = new Roommate(req.body);
    await roommate.save();
    res.status(201).json({ message: 'Roommate listing created', roommate });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllRoommates = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const filter = req.query.available === 'true' ? { availability: 'available' } : {};
    const roommates = await Roommate.find(filter).limit(limit).sort({ createdAt: -1 });
    res.json(roommates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRoommateById = async (req, res) => {
  try {
    const roommate = await Roommate.findById(req.params.id);
    if (!roommate) return res.status(404).json({ error: 'Not found' });
    await Roommate.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } });
    res.json(roommate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRoommate = async (req, res) => {
  try {
    const updated = await Roommate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Roommate listing updated', updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRoommate = async (req, res) => {
  try {
    const deleted = await Roommate.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Roommate listing deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const likeRoommate = async (req, res) => {
  try {
    const roommate = await Roommate.findByIdAndUpdate(req.params.id, { $inc: { likeCount: 1 } }, { new: true });
    if (!roommate) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Liked', likeCount: roommate.likeCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTrendingRoommates = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const trending = await Roommate.find({ availability: 'available' })
      .sort({ likeCount: -1, viewCount: -1, createdAt: -1 })
      .limit(limit);
    res.json(trending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyListings = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const listings = await Roommate.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSearchSuggestions = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.length < 2) {
      return res.json([]);
    }

    const suggestions = await Roommate.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { location: { $regex: query, $options: 'i' } }
          ]
        }
      },
      {
        $group: {
          _id: null,
          titles: { $addToSet: '$title' },
          locations: { $addToSet: '$location' }
        }
      },
      {
        $project: {
          suggestions: { $concatArrays: ['$titles', '$locations'] }
        }
      }
    ]);

    const results = suggestions[0]?.suggestions || [];
    const filtered = results
      .filter(item => item.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const {
      sort = 'newest',
      order = 'desc',
      search = '',
      location = '',
      minRent = 0,
      maxRent = 10000,
      roomType = '',
      availability = '',
      page = 1,
      limit = 12
    } = req.query;

    let filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } }
      ];
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (roomType && roomType !== 'All') {
      filter.roomType = roomType;
    }

    if (availability && availability !== 'All') {
      filter.availability = availability;
    }

    filter.rent = { $gte: parseInt(minRent), $lte: parseInt(maxRent) };

    let sortOption = {};
    switch (sort) {
      case 'rent':
        sortOption.rent = order === 'asc' ? 1 : -1;
        break;
      case 'likes':
        sortOption.likeCount = order === 'asc' ? 1 : -1;
        break;
      case 'title':
        sortOption.title = order === 'asc' ? 1 : -1;
        break;
      case 'oldest':
        sortOption.createdAt = 1;
        break;
      default:
        sortOption.createdAt = -1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [items, total] = await Promise.all([
      Roommate.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit)),
      Roommate.countDocuments(filter)
    ]);

    res.json({
      items,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
