import React from 'react';
import { useFetch } from '../hooks/useFetch';
import foundItemService from '../api/foundItemService';

const FoundItemsPage = () => {
  const { data, loading, error } = useFetch(() => foundItemService.getFoundItems(1, 20));

  return (
    <div className="found-items-page">
      <h1>Đồ Tìm Thấy</h1>
      {loading && <div className="loading">Đang tải...</div>}
      {error && <div className="error">{error}</div>}
      {data && (
        <div className="items-list">
          {data.data?.map(item => (
            <div key={item._id} className="item-card">
              <h3>{item.itemName}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundItemsPage;

