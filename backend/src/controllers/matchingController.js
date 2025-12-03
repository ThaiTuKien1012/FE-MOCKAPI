const MatchingRequest = require('../models/MatchingRequest');
const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');
const User = require('../models/User');
const idGenerator = require('../utils/idGenerator');

// Helper function
const calculateMatchConfidence = (lost, found) => {
  let confidence = 0;

  if (lost.category === found.category) confidence += 40;
  if (lost.color === found.color) confidence += 30;
  if (lost.campus === found.campus) confidence += 20;

  return Math.min(confidence, 100);
};

exports.getSuggestions = async (req, res) => {
  try {
    // Get user's lost items
    const lostItems = await LostItem.find({ 
      studentId: req.userId,
      status: 'verified'
    });

    if (!lostItems.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'No lost items found'
      });
    }

    const suggestions = [];

    for (const lost of lostItems) {
      const matches = await FoundItem.find({
        campus: lost.campus,
        category: lost.category,
        status: 'unclaimed'
      });

      for (const found of matches) {
        const confidence = calculateMatchConfidence(lost, found);

        if (confidence >= parseInt(process.env.MATCHING_CONFIDENCE_THRESHOLD || 70)) {
          suggestions.push({
            matchId: `TEMP-${Date.now()}`,
            foundItemId: found._id,
            itemName: found.itemName,
            matchConfidence: confidence,
            matchReason: 'Khớp về loại, màu, campus',
            dateFound: found.dateFound
          });
        }
      }
    }

    res.status(200).json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.confirmMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { confirmation, notes } = req.body;

    const matching = await MatchingRequest.findById(matchId);

    if (!matching) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Match not found' }
      });
    }

    matching.status = 'confirmed';
    matching.studentResponse = confirmation;
    matching.studentResponseNote = notes;
    matching.confirmedAt = new Date();
    await matching.save();

    res.status(200).json({
      success: true,
      data: matching,
      message: 'Match confirmed successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.rejectMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { reason } = req.body;

    const matching = await MatchingRequest.findById(matchId);

    if (!matching) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Match not found' }
      });
    }

    matching.status = 'rejected';
    matching.studentResponse = 'rejected';
    matching.studentResponseNote = reason;
    await matching.save();

    res.status(200).json({
      success: true,
      data: matching
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.listMatches = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const matches = await MatchingRequest.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await MatchingRequest.countDocuments(query);

    res.status(200).json({
      success: true,
      data: matches,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.resolveMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { status, notes } = req.body;

    const matching = await MatchingRequest.findById(matchId);

    if (!matching) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Match not found' }
      });
    }

    matching.status = status || 'resolved';
    await matching.save();

    // Update related items
    await LostItem.updateOne(
      { _id: matching.lostItemId },
      { status: 'matched', matchedWithFoundId: matching.foundItemId, matchedAt: new Date() }
    );

    res.status(200).json({
      success: true,
      data: matching
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

