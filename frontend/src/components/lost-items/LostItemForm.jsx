import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { CATEGORIES, CAMPUSES } from '../../utils/constants';

const LostItemForm = ({ onSubmit }) => {
  const { showError } = useNotification();
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
        await onSubmit(formData);
      } catch (error) {
        showError(error.message);
      }
    }
  );

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Handle image upload logic
  };

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
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Tạo Báo Cáo
      </button>
    </form>
  );
};

export default LostItemForm;

