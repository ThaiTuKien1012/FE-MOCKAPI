import React, { useEffect, useRef } from 'react';
import { useFetch } from '../hooks/useFetch';
import { gsap } from 'gsap';
import matchingService from '../api/matchingService';
import AnimatedBackground from '../components/common/AnimatedBackground';
import { FiTrendingUp, FiCheck, FiX } from 'react-icons/fi';

const MatchingPage = () => {
  const { data, loading, error } = useFetch(() => matchingService.getSuggestions());
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: -30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );

    if (data?.data && cardsRef.current.length > 0) {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, x: -100, rotationY: -45 },
        { 
          opacity: 1, 
          x: 0, 
          rotationY: 0, 
          duration: 0.6, 
          stagger: 0.15,
          ease: 'power3.out' 
        },
        '-=0.2'
      );
    }
  }, [data]);

  const handleCardHover = (index, isHovering) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: isHovering ? 1.05 : 1,
      y: isHovering ? -10 : 0,
      rotationY: isHovering ? 5 : 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#22C55E';
    if (confidence >= 60) return '#F97316';
    return '#EF4444';
  };

  return (
    <div ref={pageRef} className="matching-page-enhanced">
      <AnimatedBackground intensity={0.1} />
      
      <div className="page-header-enhanced">
        <div className="title-wrapper">
          <FiTrendingUp className="title-icon" />
          <h1 ref={titleRef} className="page-title">Gợi Ý Khớp Đồ</h1>
        </div>
      </div>

      <div className="content-container-enhanced">
        {loading && (
          <div className="loading-enhanced">
            <div className="spinner"></div>
            <p>Đang tải...</p>
          </div>
        )}
        
        {error && (
          <div className="error-enhanced">
            <p>{error}</p>
          </div>
        )}
        
        {data && (
          <div className="suggestions-grid-enhanced">
            {data.data?.map((suggestion, index) => (
              <div
                key={suggestion.matchId}
                ref={el => cardsRef.current[index] = el}
                className="suggestion-card-enhanced"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
              >
                <div className="card-header">
                  <h3 className="card-title">{suggestion.itemName}</h3>
                  <div 
                    className="confidence-badge"
                    style={{ backgroundColor: getConfidenceColor(suggestion.matchConfidence) }}
                  >
                    {suggestion.matchConfidence}%
                  </div>
                </div>
                <p className="card-description">{suggestion.matchReason}</p>
                <div className="card-actions">
                  <button className="btn-confirm">
                    <FiCheck />
                    Xác nhận
                  </button>
                  <button className="btn-reject">
                    <FiX />
                    Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchingPage;

