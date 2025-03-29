import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Component dùng để thay đổi tiêu đề và ảnh khi truy cập vào các route.
 * @param {string} title - Tiêu đề của trang.
 * @param {string} imageUrl - Link tới hình ảnh.
 */
const MetaHead = ({ title, imageUrl }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={imageUrl} />
      <link rel="icon" href={imageUrl} />
      <link rel="apple-touch-icon" href={imageUrl} />
    </Helmet>
  );
};

export default MetaHead;
