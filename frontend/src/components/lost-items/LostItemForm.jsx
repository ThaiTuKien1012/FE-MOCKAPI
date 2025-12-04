import React, { useState, useRef } from 'react';
import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { CATEGORIES, CAMPUSES } from '../../utils/constants';
import uploadService from '../../api/uploadService';
import { FiX } from 'react-icons/fi';

const LostItemForm = ({ onSubmit }) => {
  const { showError, showSuccess } = useNotification();
  const [images, setImages] = useState([]); // URLs từ server
  const [previewImages, setPreviewImages] = useState([]); // Local preview URLs
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const { values, handleChange, handleSubmit } = useForm(
    {
      itemName: '',
      description: '',
      category: '',
      color: '',
      dateLost: '',
      locationLost: '',
      campus: 'NVH',
      phone: '',
      images: []
    },
    async (formData) => {
      try {
        // Đảm bảo images được gửi đi
        const submitData = {
          ...formData,
          images: images // Sử dụng state images thay vì values.images
        };
        await onSubmit(submitData);
        // Reset images sau khi submit thành công
        setImages([]);
        setPreviewImages([]);
      } catch (error) {
        showError(error.message);
      }
    }
  );

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Tạo preview URLs cho local files
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previewUrls]);
    
    // Upload ngay lập tức
    handleImageUpload(files);
  };

  const handleImageUpload = async (files) => {
    setUploading(true);
    try {
      const result = await uploadService.uploadImages(files);
      
      if (result.success && result.data?.urls) {
        // Lưu relative URLs từ server (không convert sang absolute)
        // Backend trả về relative URLs, giữ nguyên để submit
        setImages(prev => [...prev, ...result.data.urls]);
        
        // Xóa preview sau khi upload thành công
        setTimeout(() => {
          setPreviewImages(prev => {
            const startIndex = prev.length - files.length;
            files.forEach((_, index) => {
              if (prev[startIndex + index]) {
                URL.revokeObjectURL(prev[startIndex + index]);
              }
            });
            return prev.slice(0, startIndex);
          });
        }, 100);
        
        showSuccess(`Đã upload ${result.data.urls.length} hình ảnh thành công!`);
      } else {
        showError(result.error?.message || result.error || 'Upload hình ảnh thất bại');
        // Xóa preview khi lỗi
        const startIndex = previewImages.length - files.length;
        files.forEach((_, index) => {
          if (previewImages[startIndex + index]) {
            URL.revokeObjectURL(previewImages[startIndex + index]);
          }
        });
        setPreviewImages(prev => prev.slice(0, startIndex));
      }
    } catch (error) {
      console.error('Upload error:', error);
      showError('Có lỗi xảy ra khi upload hình ảnh');
      // Xóa preview khi lỗi
      const startIndex = previewImages.length - files.length;
      files.forEach((_, index) => {
        if (previewImages[startIndex + index]) {
          URL.revokeObjectURL(previewImages[startIndex + index]);
        }
      });
      setPreviewImages(prev => prev.slice(0, startIndex));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (index) => {
    // Tính toán index thực tế trong mảng images và previewImages
    if (index < images.length) {
      // Xóa URL từ server (uploaded image)
      setImages(prev => prev.filter((_, i) => i !== index));
    } else {
      // Xóa preview image
      const previewIndex = index - images.length;
      if (previewImages[previewIndex]) {
        URL.revokeObjectURL(previewImages[previewIndex]);
        setPreviewImages(prev => prev.filter((_, i) => i !== previewIndex));
      }
    }
  };

  // Convert relative URLs to absolute URLs for display
  const getImageUrl = (url) => {
    if (!url) return null;
    // Preview images (local) are already blob URLs, use as is
    if (url.startsWith('blob:')) return url;
    // If URL already starts with http, use as is
    if (url.startsWith('http')) return url;
    // Convert relative URLs to absolute for display
    const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');
    if (url.startsWith('/')) return `${BASE_URL}${url}`;
    return `${BASE_URL}/uploads/${url}`;
  };

  // Hiển thị tất cả hình ảnh (đã upload + preview)
  const displayImages = [
    ...images.map(url => ({ url, type: 'uploaded' })),
    ...previewImages.map(url => ({ url, type: 'preview' }))
  ];

  return (
    <form onSubmit={handleSubmit} className="lost-item-form">
      <div className="form-group">
        <label>Tên Đồ Vật</label>
        <input
          type="text"
          name="itemName"
          value={values.itemName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Mô Tả</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          rows="4"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Loại Đồ Vật</label>
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            required
          >
            <option value="">Chọn loại</option>
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Màu Sắc</label>
          <input
            type="text"
            name="color"
            value={values.color}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Ngày Thất Lạc</label>
          <input
            type="date"
            name="dateLost"
            value={values.dateLost}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Nơi Thất Lạc</label>
          <input
            type="text"
            name="locationLost"
            value={values.locationLost}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Campus</label>
          <select
            name="campus"
            value={values.campus}
            onChange={handleChange}
            required
          >
            {CAMPUSES.map(campus => (
              <option key={campus.value} value={campus.value}>{campus.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Số Điện Thoại</label>
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Hình Ảnh</label>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageSelect}
          disabled={uploading}
        />
        {uploading && <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>Đang upload...</p>}
        
        {/* Preview Images */}
        {displayImages.length > 0 && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
            gap: '10px', 
            marginTop: '15px' 
          }}>
            {displayImages.map((item, index) => {
              const imageUrl = getImageUrl(item.url);
              return (
                <div key={index} style={{ position: 'relative' }}>
                  <img 
                    src={imageUrl} 
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #ddd'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: 'rgba(255, 0, 0, 0.8)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0
                    }}
                  >
                    <FiX size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary" disabled={uploading}>
        Tạo Báo Cáo
      </button>
    </form>
  );
};

export default LostItemForm;

