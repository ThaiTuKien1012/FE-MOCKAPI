import React, { useState, useEffect, useRef } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useNotification } from '../../hooks/useNotification';
import { gsap } from 'gsap';
import matchingService from '../../api/matchingService';
import lostItemService from '../../api/lostItemService';
import foundItemService from '../../api/foundItemService';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import { 
  FiPackage, 
  FiSearch, 
  FiCheckCircle,
  FiX,
  FiPlus,
  FiTrendingUp,
  FiClock,
  FiTag,
  FiImage,
  FiMapPin,
  FiCalendar,
  FiCheck
} from 'react-icons/fi';
import { formatDate, getImageUrl } from '../../utils/helpers';
import { CATEGORIES, CAMPUSES } from '../../utils/constants';

const MatchingManagementPage = () => {
  const { showSuccess, showError, showInfo } = useNotification();
  const [activeTab, setActiveTab] = useState('create'); // 'create', 'pending', 'confirmed', 'history'
  const [keywordLost, setKeywordLost] = useState('');
  const [keywordFound, setKeywordFound] = useState('');
  const [statusFilterLost, setStatusFilterLost] = useState('pending');
  const [statusFilterFound, setStatusFilterFound] = useState('unclaimed');
  const [campusFilter, setCampusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedLostItem, setSelectedLostItem] = useState(null);
  const [selectedFoundItem, setSelectedFoundItem] = useState(null);
  const [matchReason, setMatchReason] = useState('');
  const [notes, setNotes] = useState('');
  const [studentId, setStudentId] = useState('');
  const [creating, setCreating] = useState(false);

  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef([]);
  const lostItemsRef = useRef([]);
  const foundItemsRef = useRef([]);

  // Fetch Lost Items
  const filtersLost = {
    status: statusFilterLost,
    ...(campusFilter && { campus: campusFilter })
  };

  const { data: lostItemsData, loading: loadingLost, refetch: refetchLost } = useFetch(
    () => lostItemService.getAllReports(1, 50, filtersLost),
    [statusFilterLost, campusFilter]
  );

  // Fetch Found Items
  const filtersFound = {
    status: statusFilterFound,
    ...(campusFilter && { campus: campusFilter })
  };

  const { data: foundItemsData, loading: loadingFound, refetch: refetchFound } = useFetch(
    () => foundItemService.getFoundItems(1, 50, filtersFound),
    [statusFilterFound, campusFilter]
  );

  // Fetch Matches - All for stats
  const { data: matchesData, loading: loadingMatches, refetch: refetchMatches } = useFetch(
    () => matchingService.getMatches(1, 100),
    []
  );

  // Fetch Matches by Status for tabs
  const { data: pendingMatchesData } = useFetch(
    () => matchingService.getMatches(1, 50, 'pending'),
    [activeTab === 'pending']
  );

  const { data: confirmedMatchesData } = useFetch(
    () => matchingService.getMatches(1, 50, 'confirmed'),
    [activeTab === 'confirmed']
  );

  const { data: historyMatchesData } = useFetch(
    () => matchingService.getMatches(1, 50, 'completed'),
    [activeTab === 'history']
  );

  useEffect(() => {
    if (!titleRef.current) return;
    
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current,
      { opacity: 0, y: -30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );
  }, []);

  useEffect(() => {
    if (!matchesData?.data || statsRef.current.length === 0) return;

    const timer = setTimeout(() => {
      const validRefs = statsRef.current.filter(ref => ref !== null && ref !== undefined);
      if (validRefs.length > 0) {
        gsap.fromTo(validRefs,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
        );
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [matchesData]);

  useEffect(() => {
    if (!lostItemsData?.data || lostItemsData.data.length === 0) {
      lostItemsRef.current = [];
      return;
    }

    lostItemsRef.current = new Array(lostItemsData.data.length).fill(null);

    const timer = setTimeout(() => {
      const validRefs = lostItemsRef.current.filter(ref => ref !== null && ref !== undefined);
      if (validRefs.length > 0) {
        gsap.fromTo(validRefs,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [lostItemsData]);

  useEffect(() => {
    if (!foundItemsData?.data || foundItemsData.data.length === 0) {
      foundItemsRef.current = [];
      return;
    }

    foundItemsRef.current = new Array(foundItemsData.data.length).fill(null);

    const timer = setTimeout(() => {
      const validRefs = foundItemsRef.current.filter(ref => ref !== null && ref !== undefined);
      if (validRefs.length > 0) {
        gsap.fromTo(validRefs,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [foundItemsData]);

  const handleCreateMatch = async () => {
    if (!selectedFoundItem) {
      showError('Vui lòng chọn đồ tìm thấy');
      return;
    }

    if (!selectedLostItem && !studentId) {
      showError('Vui lòng chọn đồ báo mất hoặc nhập Student ID');
      return;
    }

    setCreating(true);
    try {
      const result = await matchingService.createManualMatch(
        selectedLostItem?.reportId || null,
        selectedFoundItem.foundId,
        matchReason || 'Staff manually matched items',
        notes,
        studentId || null
      );

      if (result.success) {
        showSuccess('Tạo match thành công!');
        setShowCreateModal(false);
        setSelectedLostItem(null);
        setSelectedFoundItem(null);
        setMatchReason('');
        setNotes('');
        setStudentId('');
        refetchMatches();
        refetchLost();
        refetchFound();
      } else {
        showError(result.error?.message || 'Tạo match thất bại');
      }
    } catch (error) {
      showError('Có lỗi xảy ra khi tạo match');
    } finally {
      setCreating(false);
    }
  };

  const getCategoryLabel = (category) => {
    const cat = CATEGORIES.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  const filteredLostItems = lostItemsData?.data?.filter(item => {
    if (!keywordLost) return true;
    const searchTerm = keywordLost.toLowerCase();
    return (
      item.itemName?.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm) ||
      item.reportId?.toLowerCase().includes(searchTerm)
    );
  }) || [];

  const filteredFoundItems = foundItemsData?.data?.filter(item => {
    if (!keywordFound) return true;
    const searchTerm = keywordFound.toLowerCase();
    return (
      item.itemName?.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm) ||
      item.foundId?.toLowerCase().includes(searchTerm)
    );
  }) || [];

  const calculateStats = () => {
    if (!matchesData?.data) return { total: 0, pending: 0, confirmed: 0 };
    
    const matches = matchesData.data;
    return {
      total: matches.length,
      pending: matches.filter(m => m.status === 'pending').length,
      confirmed: matches.filter(m => m.status === 'confirmed').length
    };
  };

  const stats = calculateStats();

  return (
    <div className="page-container" ref={pageRef}>
      <AnimatedBackground />
      <div className="page-content">
        {/* Header */}
        <div className="page-header-enhanced">
          <div className="title-wrapper">
            <FiTrendingUp className="title-icon" />
            <h1 className="page-title" ref={titleRef}>Quản Lý Khớp Đồ</h1>
          </div>
          <button
            className="btn-create-match-redesign"
            onClick={() => setShowCreateModal(true)}
          >
            <FiPlus /> Tạo Match Thủ Công
          </button>
        </div>

        {/* Statistics */}
        <div className="found-items-stats-section">
          <div 
            ref={el => statsRef.current[0] = el}
            className="stat-card-found"
          >
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FiTrendingUp />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Tổng Matches</span>
            </div>
          </div>

          <div 
            ref={el => statsRef.current[1] = el}
            className="stat-card-found"
          >
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <FiClock />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.pending}</span>
              <span className="stat-label">Đang Chờ</span>
            </div>
          </div>

          <div 
            ref={el => statsRef.current[2] = el}
            className="stat-card-found"
          >
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <FiCheckCircle />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.confirmed}</span>
              <span className="stat-label">Đã Xác Nhận</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container" style={{ marginBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
          <button
            className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'create' ? '3px solid #2180A0' : '3px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === 'create' ? '600' : '400',
              color: activeTab === 'create' ? '#2180A0' : '#666'
            }}
          >
            Tạo Match
          </button>
          <button
            className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'pending' ? '3px solid #2180A0' : '3px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === 'pending' ? '600' : '400',
              color: activeTab === 'pending' ? '#2180A0' : '#666'
            }}
          >
            Đang Chờ ({stats.pending})
          </button>
          <button
            className={`tab-button ${activeTab === 'confirmed' ? 'active' : ''}`}
            onClick={() => setActiveTab('confirmed')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'confirmed' ? '3px solid #2180A0' : '3px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === 'confirmed' ? '600' : '400',
              color: activeTab === 'confirmed' ? '#2180A0' : '#666'
            }}
          >
            Đã Xác Nhận ({stats.confirmed})
          </button>
          <button
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'history' ? '3px solid #2180A0' : '3px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === 'history' ? '600' : '400',
              color: activeTab === 'history' ? '#2180A0' : '#666'
            }}
          >
            Lịch Sử
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'create' && (
          <>
            {/* Filters */}
            <div className="filters-panel-redesign">
              <div className="filter-group-redesign">
                <label>Campus:</label>
                <select
                  value={campusFilter}
                  onChange={(e) => setCampusFilter(e.target.value)}
                  className="filter-select-redesign"
                >
                  <option value="">Tất cả</option>
                  {CAMPUSES.map(campus => (
                    <option key={campus.value} value={campus.value}>{campus.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Two Column Layout */}
        <div className="matching-panels-container">
          {/* Lost Items Section */}
          <div className="matching-panel-redesign">
            <div className="matching-panel-header-redesign">
              <div className="panel-title-section">
                <FiPackage className="panel-icon" />
                <h2 className="panel-title">Đồ Báo Mất (Pending)</h2>
              </div>
              <div className="search-box-redesign">
                <FiSearch className="search-icon-redesign" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={keywordLost}
                  onChange={(e) => setKeywordLost(e.target.value)}
                  className="search-input-redesign"
                />
              </div>
            </div>
            <div className="matching-panel-body-redesign">
              {loadingLost ? (
                <div className="loading-enhanced">
                  <div className="spinner"></div>
                  <p>Đang tải...</p>
                </div>
              ) : filteredLostItems.length === 0 ? (
                <div className="empty-state-redesign">
                  <FiPackage className="empty-icon-redesign" />
                  <p>Không có đồ báo mất nào</p>
                </div>
              ) : (
                <div className="matching-items-grid-redesign">
                  {filteredLostItems.map((item, index) => (
                    <div
                      key={item._id}
                      ref={el => lostItemsRef.current[index] = el}
                      className={`matching-item-card-redesign ${selectedLostItem?._id === item._id ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedLostItem(item);
                        showInfo(`Đã chọn "${item.itemName}" làm Đồ Báo Mất`);
                      }}
                    >
                      {item.images?.[0] ? (
                        <img
                          src={getImageUrl(item.images[0])}
                          alt={item.itemName}
                          className="matching-item-image-redesign"
                        />
                      ) : (
                        <div className="matching-item-image-placeholder-redesign">
                          <FiImage className="placeholder-icon-redesign" />
                        </div>
                      )}
                      <div className="matching-item-info-redesign">
                        {selectedLostItem?._id === item._id && (
                          <div className="item-selected-badge-redesign">
                            <FiCheck /> Đã chọn
                          </div>
                        )}
                        <h3 className="matching-item-title-redesign">{item.itemName}</h3>
                        <div className="matching-item-meta-redesign">
                          <span className="meta-badge-redesign">
                            <FiTag /> {getCategoryLabel(item.category)}
                          </span>
                          <span className="meta-badge-redesign">
                            <FiCalendar /> {formatDate(item.dateLost)}
                          </span>
                        </div>
                        <p className="matching-item-id-redesign">ID: {item.reportId}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Found Items Section */}
          <div className="matching-panel-redesign">
            <div className="matching-panel-header-redesign">
              <div className="panel-title-section">
                <FiCheckCircle className="panel-icon" />
                <h2 className="panel-title">Đồ Tìm Thấy (Unclaimed)</h2>
              </div>
              <div className="search-box-redesign">
                <FiSearch className="search-icon-redesign" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={keywordFound}
                  onChange={(e) => setKeywordFound(e.target.value)}
                  className="search-input-redesign"
                />
              </div>
            </div>
            <div className="matching-panel-body-redesign">
              {loadingFound ? (
                <div className="loading-enhanced">
                  <div className="spinner"></div>
                  <p>Đang tải...</p>
                </div>
              ) : filteredFoundItems.length === 0 ? (
                <div className="empty-state-redesign">
                  <FiCheckCircle className="empty-icon-redesign" />
                  <p>Không có đồ tìm thấy nào</p>
                </div>
              ) : (
                <div className="matching-items-grid-redesign">
                  {filteredFoundItems.map((item, index) => (
                    <div
                      key={item._id}
                      ref={el => foundItemsRef.current[index] = el}
                      className={`matching-item-card-redesign ${selectedFoundItem?._id === item._id ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedFoundItem(item);
                        showInfo(`Đã chọn "${item.itemName}" làm Đồ Tìm Thấy`);
                      }}
                    >
                      {item.images?.[0] ? (
                        <img
                          src={getImageUrl(item.images[0])}
                          alt={item.itemName}
                          className="matching-item-image-redesign"
                        />
                      ) : (
                        <div className="matching-item-image-placeholder-redesign">
                          <FiImage className="placeholder-icon-redesign" />
                        </div>
                      )}
                      <div className="matching-item-info-redesign">
                        {selectedFoundItem?._id === item._id && (
                          <div className="item-selected-badge-redesign">
                            <FiCheck /> Đã chọn
                          </div>
                        )}
                        <h3 className="matching-item-title-redesign">{item.itemName}</h3>
                        <div className="matching-item-meta-redesign">
                          <span className="meta-badge-redesign">
                            <FiTag /> {getCategoryLabel(item.category)}
                          </span>
                          <span className="meta-badge-redesign">
                            <FiCalendar /> {formatDate(item.dateFound)}
                          </span>
                        </div>
                        <p className="matching-item-id-redesign">ID: {item.foundId}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
          </>
        )}

        {/* Create Match Modal */}
        {showCreateModal && (
          <div className="modal-overlay-redesign" onClick={() => setShowCreateModal(false)}>
            <div className="modal-content-redesign" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-redesign">
                <h2>Tạo Match Thủ Công</h2>
                <button
                  className="modal-close-redesign"
                  onClick={() => setShowCreateModal(false)}
                >
                  <FiX />
                </button>
              </div>
              <div className="modal-body-redesign">
                <div className="form-group-redesign">
                  <label>Đồ Tìm Thấy *</label>
                  {selectedFoundItem ? (
                    <div className="selected-item-display-redesign">
                      <div className="selected-item-info-redesign">
                        <strong>{selectedFoundItem.itemName}</strong>
                        <span>({selectedFoundItem.foundId})</span>
                      </div>
                      <button
                        className="btn-remove-selection-redesign"
                        onClick={() => setSelectedFoundItem(null)}
                      >
                        <FiX /> Xóa
                      </button>
                    </div>
                  ) : (
                    <p className="text-muted-redesign">Vui lòng chọn đồ tìm thấy từ danh sách bên phải</p>
                  )}
                </div>

                <div className="form-group-redesign">
                  <label>Đồ Báo Mất (Tùy chọn)</label>
                  {selectedLostItem ? (
                    <div className="selected-item-display-redesign">
                      <div className="selected-item-info-redesign">
                        <strong>{selectedLostItem.itemName}</strong>
                        <span>({selectedLostItem.reportId})</span>
                      </div>
                      <button
                        className="btn-remove-selection-redesign"
                        onClick={() => setSelectedLostItem(null)}
                      >
                        <FiX /> Xóa
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-muted-redesign">Hoặc nhập Student ID nếu không có đồ báo mất:</p>
                      <input
                        type="text"
                        className="form-input-redesign"
                        placeholder="Student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                      />
                    </>
                  )}
                </div>

                <div className="form-group-redesign">
                  <label>Lý Do Match</label>
                  <textarea
                    className="form-textarea-redesign"
                    rows="3"
                    placeholder="Nhập lý do match (ví dụ: Ví da đen, có tiền)"
                    value={matchReason}
                    onChange={(e) => setMatchReason(e.target.value)}
                  />
                </div>

                <div className="form-group-redesign">
                  <label>Ghi Chú</label>
                  <textarea
                    className="form-textarea-redesign"
                    rows="2"
                    placeholder="Ghi chú thêm (tùy chọn)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer-redesign">
                <button
                  className="btn-secondary-redesign"
                  onClick={() => setShowCreateModal(false)}
                  disabled={creating}
                >
                  Hủy
                </button>
                <button
                  className="btn-primary-redesign"
                  onClick={handleCreateMatch}
                  disabled={creating || !selectedFoundItem}
                >
                  {creating ? 'Đang tạo...' : 'Tạo Match'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pending Matches Tab */}
        {activeTab === 'pending' && (
          <div className="card">
            <div className="card-body">
              <h3 style={{ marginBottom: '20px' }}>Đang Chờ Xác Nhận ({pendingMatchesData?.data?.length || 0})</h3>
              {!pendingMatchesData?.data?.length ? (
                <div className="empty-state-redesign">
                  <FiClock className="empty-icon-redesign" />
                  <h3>Chưa có match nào đang chờ</h3>
                </div>
              ) : (
                <div className="items-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                  {pendingMatchesData.data.map((match) => (
                    <div key={match._id || match.requestId} className="item-card" style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                      <h4>{match.foundItem?.itemName || 'N/A'}</h4>
                      <p><strong>Sinh viên:</strong> {match.student?.name || 'N/A'}</p>
                      <p><strong>Ngày tạo:</strong> {formatDate(match.createdAt)}</p>
                      <p><strong>Lý do:</strong> {match.matchReason || 'N/A'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Confirmed Matches Tab */}
        {activeTab === 'confirmed' && (
          <div className="card">
            <div className="card-body">
              <h3 style={{ marginBottom: '20px' }}>Đã Xác Nhận ({confirmedMatchesData?.data?.length || 0})</h3>
              {!confirmedMatchesData?.data?.length ? (
                <div className="empty-state-redesign">
                  <FiCheckCircle className="empty-icon-redesign" />
                  <h3>Chưa có match nào đã xác nhận</h3>
                </div>
              ) : (
                <div className="items-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                  {confirmedMatchesData.data.map((match) => (
                    <div key={match._id || match.requestId} className="item-card" style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                      <h4>{match.foundItem?.itemName || 'N/A'}</h4>
                      <p><strong>Sinh viên:</strong> {match.student?.name || 'N/A'}</p>
                      <p><strong>Ngày xác nhận:</strong> {formatDate(match.confirmedAt)}</p>
                      <p><strong>Ghi chú:</strong> {match.confirmNotes || 'N/A'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="card">
            <div className="card-body">
              <h3 style={{ marginBottom: '20px' }}>Lịch Sử ({historyMatchesData?.data?.length || 0})</h3>
              {!historyMatchesData?.data?.length ? (
                <div className="empty-state-redesign">
                  <FiClock className="empty-icon-redesign" />
                  <h3>Chưa có lịch sử</h3>
                </div>
              ) : (
                <div className="items-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                  {historyMatchesData.data.map((match) => (
                    <div key={match._id || match.requestId} className="item-card" style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                      <h4>{match.foundItem?.itemName || 'N/A'}</h4>
                      <p><strong>Sinh viên:</strong> {match.student?.name || 'N/A'}</p>
                      <p><strong>Ngày hoàn thành:</strong> {formatDate(match.completedAt)}</p>
                      <p><strong>Ghi chú:</strong> {match.completionNotes || 'N/A'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchingManagementPage;
