const FoundItem = require('../models/FoundItem');
const idGenerator = require('../utils/idGenerator');

exports.createFoundItem = async (req, res) => {
  try {
    const foundId = idGenerator.generateFoundItemId(req.body.campus);

    const foundItem = new FoundItem({
      foundId,
      securityOfficerId: req.userId,
      ...req.body,
      status: 'unclaimed'
    });

    await foundItem.save();

    res.status(201).json({
      success: true,
      data: { foundId, ...foundItem.toObject() },
      message: 'Found item recorded successfully'
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getFoundItem = async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id);

    if (!foundItem) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Found item not found' }
      });
    }

    foundItem.viewCount += 1;
    await foundItem.save();

    res.status(200).json({
      success: true,
      data: foundItem
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.listFoundItems = async (req, res) => {
  try {
    const { campus, status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (campus) query.campus = campus;
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const items = await FoundItem.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await FoundItem.countDocuments(query);

    res.status(200).json({
      success: true,
      data: items,
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

exports.updateFoundItem = async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id);

    if (!foundItem) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Found item not found' }
      });
    }

    Object.assign(foundItem, req.body);
    await foundItem.save();

    res.status(200).json({
      success: true,
      data: foundItem,
      message: 'Found item updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteFoundItem = async (req, res) => {
  try {
    await FoundItem.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Found item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.searchFoundItems = async (req, res) => {
  try {
    const { keyword, category, campus, page = 1, limit = 20 } = req.query;
    const query = { status: 'unclaimed' };

    if (keyword) {
      query.$text = { $search: keyword };
    }
    if (category) query.category = category;
    if (campus) query.campus = campus;

    const skip = (page - 1) * limit;

    const results = await FoundItem.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await FoundItem.countDocuments(query);

    res.status(200).json({
      success: true,
      data: results,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

