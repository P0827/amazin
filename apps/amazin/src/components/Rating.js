import { memo } from 'react';

function Rating({ rating, numReviews, caption, steps = 5 }) {
  const isHalf = (test, className) => (test ? className : '');
  return (
    <div className="rating">
      <span>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, steps).map((star) => (
          <i
            className={`fa fa-star${star <= rating + 0.5 ? isHalf(star === rating + 0.5, '-half-o') : '-o'}`}
            key={star}
          />
        ))}
      </span>
      <span>{caption || `${numReviews} review${numReviews > 1 ? 's' : ''}`}</span>
    </div>
  );
}

export default memo(Rating);
