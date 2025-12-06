import React, { useState, useRef } from 'react';
import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { CATEGORIES, CAMPUSES, CONDITIONS } from '../../utils/constants';
import uploadService from '../../api/uploadService';
import { FiX, FiUpload } from 'react-icons/fi';

const FoundItemForm = ({ onSubmit }) => {
  const { showError, showSuccess } = useNotification();
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const { values, handleChange, handleSubmit, reset } = useForm(
    {
      itemName: '',
      description: '',
      category: '',
      color: '',
      condition: 'good',
      campus: user?.campus || 'NVH',
      dateFound: new Date().toISOString().split('T')[0],
      locationFound: '',
      warehouseLocation: '',
      notes: ''
    },
    async (formData) => {
      try {
        const submitData = {
          ...formData,
          images: images
        };
        const success = await onSubmit(submitData);
        if (success) {
          reset();
          setImages([]);
          setPreviewImages([]);
        }
      } catch (error) {
        showError(error.message);
      }
    }
  );

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previewUrls]);
    
    handleImageUpload(files);
  };

  const handleImageUpload = async (files) => {
    setUploading(true);
    try {
      const result = await uploadService.uploadImages(files);
      
      if (result.success && result.data?.urls) {
        setImages(prev => [...prev, ...result.data.urls]);
        
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
        showError('Upload hình ảnh thất bại');
        setPreviewImages(prev => prev.slice(0, prev.length - files.length));
      }
    } catch (error) {
      showError('Có lỗi xảy ra khi upload hình ảnh');
      setPreviewImages(prev => prev.slice(0, prev.length - files.length));
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (previewImages[index]) {
      URL.revokeObjectURL(previewImages[index]);
      setPreviewImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="found-item-form">
      <div className="form-row">
        <div className="form-group">
          <label>Tên Đồ Vật *</label>
          <input
            type="text"
            name="itemName"
            value={values.itemName}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Ví dụ: Ví da đen"
          />
        </div>

        <div className="form-group">
          <label>Loại Đồ Vật *</label>
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Chọn loại</option>
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Mô Tả Chi Tiết *</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          required
          rows="4"
          className="form-textarea"
          placeholder="Mô tả chi tiết về đồ vật..."
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Màu Sắc *</label>
          <input
            type="text"
            name="color"
            value={values.color}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Ví dụ: Đen"
          />
        </div>

        <div className="form-group">
          <label>Tình Trạng *</label>
          <select
            name="condition"
            value={values.condition}
            onChange={handleChange}
            required
            className="form-select"
          >
            {CONDITIONS.map(cond => (
              <option key={cond.value} value={cond.value}>{cond.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Ngày Nhặt Được *</label>
          <input
            type="date"
            name="dateFound"
            value={values.dateFound}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Campus *</label>
          <select
            name="campus"
            value={values.campus}
            onChange={handleChange}
            required
            className="form-select"
          >
            {CAMPUSES.map(campus => (
              <option key={campus.value} value={campus.value}>{campus.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Nơi Nhặt Được *</label>
        <input
          type="text"
          name="locationFound"
          value={values.locationFound}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="Ví dụ: Thư viện tầng 2"
        />
      </div>

      <div className="form-group">
        <label>Vị Trí Kho</label>
        <input
          type="text"
          name="warehouseLocation"
          value={values.warehouseLocation}
          onChange={handleChange}
          className="form-input"
          placeholder="Ví dụ: Kho A, Kệ 3"
        />
      </div>

      <div className="form-group">
        <label>Hình Ảnh</label>
        <div className="image-upload-section">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-secondary"
            disabled={uploading}
          >
            <FiUpload /> {uploading ? 'Đang upload...' : 'Chọn Hình Ảnh'}
          </button>
          
          {previewImages.length > 0 && (
            <div className="image-preview-grid">
              {previewImages.map((preview, index) => (
                <div key={index} className="image-preview-item">
                  <img src={preview} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="remove-image-btn"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>Ghi Chú</label>
        <textarea
          name="notes"
          value={values.notes}
          onChange={handleChange}
          rows="2"
          className="form-textarea"
          placeholder="Ghi chú thêm (tùy chọn)"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={uploading}>
          ✅ Lưu Đồ Tìm Thấy
        </button>
      </div>
    </form>
  );
};

export default FoundItemForm;

