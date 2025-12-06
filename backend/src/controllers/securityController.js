const FoundItem = require('../models/FoundItem');
const MatchingRequest = require('../models/MatchingRequest');
const User = require('../models/User');

// Security Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const securityId = req.userId;
    const user = await User.findById(securityId);
    
    if (!user || user.role !== 'security' || !user.campus) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Only security officers can access this endpoint' }
      });
    }

    const campus = user.campus;

    // Get all found items in security's campus
    const allFoundItems = await FoundItem.find({ campus });
    
    // Count by status
    const totalFound = allFoundItems.length;
    const unclaimed = allFoundItems.filter(item => item.status === 'unclaimed').length;
    
    // Get matches for found items in this campus
    const foundItemIds = allFoundItems.map(item => item.foundId);
    const matches = await MatchingRequest.find({ foundItemId: { $in: foundItemIds } });
    
    const confirmed = matches.filter(m => m.status === 'confirmed').length;
    const completed = matches.filter(m => m.status === 'completed').length;
    const pending = matches.filter(m => m.status === 'pending').length;

    // Today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayFound = await FoundItem.countDocuments({
      campus,
      createdAt: { $gte: today, $lt: tomorrow }
    });

    const todayConfirmed = await MatchingRequest.countDocuments({
      foundItemId: { $in: foundItemIds },
      status: 'confirmed',
      confirmedAt: { $gte: today, $lt: tomorrow }
    });

    const todayCompleted = await MatchingRequest.countDocuments({
      foundItemId: { $in: foundItemIds },
      status: 'completed',
      completedAt: { $gte: today, $lt: tomorrow }
    });

    res.status(200).json({
      success: true,
      data: {
        total: totalFound,
        unclaimed,
        pending,
        confirmed,
        completed,
        today: {
          found: todayFound,
          confirmed: todayConfirmed,
          completed: todayCompleted
        },
        campus
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: error.message }
    });
  }
};

