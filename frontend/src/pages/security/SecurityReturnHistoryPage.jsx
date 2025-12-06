import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import matchingService from '../../api/matchingService';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import { FiClock, FiSearch, FiCalendar } from 'react-icons/fi';
import { formatDate } from '../../utils/helpers';

const SecurityReturnHistoryPage = () => {
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const { data, loading, error, refetch } = useFetch(
    () => {
      const additionalParams = {};
      if (fromDate) additionalParams.fromDate = fromDate;
      if (toDate) additionalParams.toDate = toDate;
      return matchingService.getMatches(1, 50, 'completed', additionalParams);
    },
    [fromDate, toDate]
  );

  if (loading) {
    return (
      <div className="page-container">
        <AnimatedBackground />
        <div className="page-content">
          <div className="loading-enhanced">
            <div className="spinner"></div>
            <p>Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage = typeof error === 'string' ? error : (error?.message || error?.code || 'Có lỗi xảy ra');
    return (
      <div className="page-container">
        <AnimatedBackground />
        <div className="page-content">
          <div className="error-enhanced">
            <p>{errorMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <AnimatedBackground />
      <div className="page-content">
        <div className="page-header-enhanced">
          <div className="title-wrapper">
            <FiClock className="title-icon" />
            <div>
              <h1 className="page-title">Lịch Sử Trả Đồ</h1>
              <p className="page-subtitle">Xem lịch sử các giao dịch trả đồ đã hoàn thành</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            {/* Search and Filter */}
            <div className="filter-section" style={{ marginBottom: '20px' }}>
              <div className="search-bar-container">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên đồ vật, sinh viên..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="date-filter-container" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <div className="date-input-wrapper">
                  <FiCalendar className="date-icon" />
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    placeholder="Từ ngày"
                    className="date-input"
                  />
                </div>
                <div className="date-input-wrapper">
                  <FiCalendar className="date-icon" />
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    placeholder="Đến ngày"
                    className="date-input"
                  />
                </div>
              </div>
            </div>

            {!data?.data?.length ? (
              <div className="empty-state-redesign">
                <FiClock className="empty-icon-redesign" />
                <h3>Chưa có lịch sử trả đồ</h3>
                <p>Chưa có giao dịch trả đồ nào được hoàn thành</p>
              </div>
            ) : (
              <div className="items-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {data.data
                  .filter((match) => {
                    if (!search) return true;
                    const searchLower = search.toLowerCase();
                    return (
                      match.foundItem?.itemName?.toLowerCase().includes(searchLower) ||
                      match.student?.name?.toLowerCase().includes(searchLower) ||
                      match.foundItem?.category?.toLowerCase().includes(searchLower)
                    );
                  })
                  .map((match) => (
                    <div key={match._id || match.requestId} className="history-card" style={{
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: '16px',
                      backgroundColor: '#fff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {/* Item Image */}
                      {match.foundItem?.images?.[0] && (
                        <img
                          src={match.foundItem.images[0]}
                          alt={match.foundItem.itemName}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginBottom: '12px'
                          }}
                        />
                      )}

                      {/* Item Info */}
                      <div className="item-info" style={{ marginBottom: '12px' }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                          ✅ {match.foundItem?.itemName || 'N/A'}
                        </h4>
                        <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                          {match.foundItem?.category || 'N/A'}
                        </p>
                      </div>

                      {/* Student Info */}
                      <div className="student-info" style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>👤 {match.student?.name || 'N/A'}</strong>
                        </div>
                        {match.student?.phone && (
                          <div style={{ fontSize: '14px', color: '#666' }}>
                            📱 {match.student.phone}
                          </div>
                        )}
                        {match.student?.email && (
                          <div style={{ fontSize: '14px', color: '#666' }}>
                            ✉️ {match.student.email}
                          </div>
                        )}
                      </div>

                      {/* Return Info */}
                      <div className="return-info" style={{ marginBottom: '12px', fontSize: '14px' }}>
                        {match.completedAt && (
                          <div style={{ marginBottom: '4px' }}>
                            ✅ <strong>Đã trả lúc:</strong> {formatDate(match.completedAt)}
                          </div>
                        )}
                        {match.completedBy && (
                          <div style={{ color: '#666' }}>
                            👤 <strong>Xác nhận bởi:</strong> {match.completedBy}
                          </div>
                        )}
                      </div>

                      {/* Notes */}
                      {match.completionNotes && (
                        <div style={{
                          padding: '8px',
                          backgroundColor: '#fff9e6',
                          borderRadius: '4px',
                          fontSize: '14px',
                          marginBottom: '12px'
                        }}>
                          📝 <strong>Ghi chú:</strong> {match.completionNotes}
                        </div>
                      )}

                      {/* Match Reason */}
                      {match.matchReason && (
                        <div style={{
                          padding: '8px',
                          backgroundColor: '#f0f7ff',
                          borderRadius: '4px',
                          fontSize: '13px',
                          color: '#666',
                          marginBottom: '12px'
                        }}>
                          💡 {match.matchReason}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityReturnHistoryPage;

