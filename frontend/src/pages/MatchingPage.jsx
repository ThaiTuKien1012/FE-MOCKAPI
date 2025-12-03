import React from 'react';
import { useFetch } from '../hooks/useFetch';
import matchingService from '../api/matchingService';

const MatchingPage = () => {
  const { data, loading, error } = useFetch(() => matchingService.getSuggestions());

  return (
    <div className="matching-page">
      <h1>Gợi Ý Khớp Đồ</h1>
      {loading && <div className="loading">Đang tải...</div>}
      {error && <div className="error">{error}</div>}
      {data && (
        <div className="suggestions-list">
          {data.data?.map(suggestion => (
            <div key={suggestion.matchId} className="suggestion-card">
              <h3>{suggestion.itemName}</h3>
              <p>Độ khớp: {suggestion.matchConfidence}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchingPage;

