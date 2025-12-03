import { format } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return '';
  try {
    return format(new Date(date), 'dd/MM/yyyy');
  } catch (error) {
    return date;
  }
};

export const formatDateTime = (date) => {
  if (!date) return '';
  try {
    return format(new Date(date), 'dd/MM/yyyy HH:mm');
  } catch (error) {
    return date;
  }
};

export const getStatusColor = (status) => {
  const statusColors = {
    pending: 'warning',
    verified: 'info',
    rejected: 'danger',
    matched: 'success',
    returned: 'success',
    unclaimed: 'warning'
  };
  return statusColors[status] || 'secondary';
};

export const getStatusLabel = (status) => {
  const statusLabels = {
    pending: 'Chờ xác nhận',
    verified: 'Đã xác nhận',
    rejected: 'Bị từ chối',
    matched: 'Khớp với đồ tìm thấy',
    returned: 'Đã trả',
    unclaimed: 'Chưa được nhận'
  };
  return statusLabels[status] || status;
};

