const generateLostItemId = (campus) => {
  const date = new Date();
  const year = date.getFullYear();
  const count = Math.floor(Math.random() * 999) + 1;
  return `LF-${campus}-${year}-${String(count).padStart(3, '0')}`;
};

const generateFoundItemId = (campus) => {
  const date = new Date();
  const year = date.getFullYear();
  const count = Math.floor(Math.random() * 999) + 1;
  return `FF-${campus}-${year}-${String(count).padStart(3, '0')}`;
};

const generateMatchingRequestId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const count = Math.floor(Math.random() * 9999) + 1;
  return `MR-${year}-${String(count).padStart(4, '0')}`;
};

const generateReturnTransactionId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const count = Math.floor(Math.random() * 9999) + 1;
  return `RT-${year}-${String(count).padStart(4, '0')}`;
};

module.exports = {
  generateLostItemId,
  generateFoundItemId,
  generateMatchingRequestId,
  generateReturnTransactionId
};

