const ReturnTransaction = require('../models/ReturnTransaction');
const idGenerator = require('../utils/idGenerator');

exports.createReturn = async (req, res) => {
  try {
    const { foundItemId, studentId, campus, returnDetails } = req.body;

    const transactionId = idGenerator.generateReturnTransactionId();

    const transaction = new ReturnTransaction({
      transactionId,
      foundItemId,
      studentId,
      campus,
      securityOfficerId: req.userId,
      returnedDate: returnDetails.returnedDate,
      verificationMethod: returnDetails.verificationMethod,
      condition: returnDetails.condition,
      items: [{
        foundItemId,
        condition: returnDetails.condition,
        notes: returnDetails.notes
      }],
      status: 'completed'
    });

    await transaction.save();

    res.status(201).json({
      success: true,
      data: { transactionId, ...transaction.toObject() },
      message: 'Return recorded successfully'
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getReturnDetail = async (req, res) => {
  try {
    const transaction = await ReturnTransaction.findById(req.params.transactionId);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Transaction not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getMyTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const transactions = await ReturnTransaction.find({ studentId: req.userId })
      .sort({ returnedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ReturnTransaction.countDocuments({ studentId: req.userId });

    res.status(200).json({
      success: true,
      data: transactions,
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

exports.listReturns = async (req, res) => {
  try {
    const { campus, date, page = 1, limit = 20 } = req.query;
    const query = {};

    if (campus) query.campus = campus;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.returnedDate = { $gte: startDate, $lt: endDate };
    }

    const skip = (page - 1) * limit;

    const transactions = await ReturnTransaction.find(query)
      .sort({ returnedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ReturnTransaction.countDocuments(query);

    res.status(200).json({
      success: true,
      data: transactions,
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

exports.updateReturn = async (req, res) => {
  try {
    const transaction = await ReturnTransaction.findById(req.params.transactionId);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Transaction not found' }
      });
    }

    Object.assign(transaction, req.body);
    await transaction.save();

    res.status(200).json({
      success: true,
      data: transaction,
      message: 'Return updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

