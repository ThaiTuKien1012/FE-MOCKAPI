import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import { getStatusLabel } from '../../utils/helpers';

const LostItemList = ({ items, pagination, onPageChange }) => {
  return (
    <div className="lost-items-list">
      {items.length === 0 ? (
        <div className="empty-state">
          <p>Chưa có báo cáo nào</p>
        </div>
      ) : (
        <>
          <div className="items-grid">
            {items.map((item) => (
              <div key={item._id} className="item-card">
                <div className="item-image">
                  {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.itemName} />
                  ) : (
                    <div className="placeholder">Không có hình</div>
                  )}
                </div>
                <div className="item-info">
                  <h3>{item.itemName}</h3>
                  <p className="description">{item.description}</p>
                  <div className="meta">
                    <span className="category">{item.category}</span>
                    <span className="color">Màu: {item.color}</span>
                  </div>
                  <div className="status">
                    <span className={`badge badge-${item.status}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                  <div className="date">
                    Ngày: {formatDate(item.dateLost)}
                  </div>
                  <Link
                    to={`/lost-items/${item._id}`}
                    className="btn btn-small"
                  >
                    Chi Tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="pagination">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`page-btn ${
                      pageNum === pagination.page ? 'active' : ''
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LostItemList;

