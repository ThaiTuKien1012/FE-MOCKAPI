import React, { useEffect, useRef } from 'react';
import { useFetch } from '../hooks/useFetch';
import { gsap } from 'gsap';
import foundItemService from '../api/foundItemService';
import AnimatedBackground from '../components/common/AnimatedBackground';
import { FiSearch, FiPackage } from 'react-icons/fi';

const FoundItemsPage = () => {
  const { data, loading, error } = useFetch(() => foundItemService.getFoundItems(1, 20));
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: -30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );

    if (data?.data && itemsRef.current.length > 0) {
      gsap.fromTo(itemsRef.current,
        { opacity: 0, y: 50, rotationX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0, 
          duration: 0.5, 
          stagger: 0.1,
          ease: 'power3.out' 
        },
        '-=0.2'
      );
    }
  }, [data]);

  const handleCardHover = (index, isHovering) => {
    const card = itemsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: isHovering ? 1.03 : 1,
      y: isHovering ? -5 : 0,
      rotationY: isHovering ? 2 : 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <div ref={pageRef} className="found-items-page-enhanced">
      <AnimatedBackground intensity={0.1} />
      
      <div className="page-header-enhanced">
        <div className="title-wrapper">
          <FiSearch className="title-icon" />
          <h1 ref={titleRef} className="page-title">Đồ Tìm Thấy</h1>
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
          <div className="items-grid-enhanced">
            {data.data?.map((item, index) => (
              <div
                key={item._id}
                ref={el => itemsRef.current[index] = el}
                className="item-card-enhanced"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
              >
                <div className="card-header">
                  <FiPackage className="card-icon" />
                  <h3 className="card-title">{item.itemName}</h3>
                </div>
                <p className="card-description">{item.description}</p>
                <div className="card-footer">
                  <span className="card-status">{item.status}</span>
                  <span className="card-date">
                    {new Date(item.dateFound).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoundItemsPage;

