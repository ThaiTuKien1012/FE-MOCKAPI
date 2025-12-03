import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { useNotification } from '../hooks/useNotification';
import lostItemService from '../api/lostItemService';
import LostItemForm from '../components/lost-items/LostItemForm';
import LostItemList from '../components/lost-items/LostItemList';

const LostItemsPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const { data, loading, error } = useFetch(
    () => lostItemService.getMyReports(page),
    [page]
  );

  const handleCreateReport = async (formData) => {
    const result = await lostItemService.createReport(formData);
    if (result.success) {
      showSuccess('Báo cáo đã được tạo thành công!');
      setShowForm(false);
      window.location.reload();
    } else {
      showError(result.error?.message || 'Tạo báo cáo thất bại');
    }
  };

  return (
    <div className="lost-items-page">
      <div className="page-header">
        <h1>Báo Cáo Đồ Thất Lạc</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Hủy' : 'Tạo Báo Cáo Mới'}
        </button>
      </div>

      {showForm && (
        <LostItemForm onSubmit={handleCreateReport} />
      )}

      {loading ? (
        <div className="loading">Đang tải...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <LostItemList
          items={data?.data || []}
          pagination={data?.pagination}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default LostItemsPage;

