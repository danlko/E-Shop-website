import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { useNavigate } from 'react-router-dom';

function ProductCard({
  id,
  name,
  price,
  imageUrl,
  color,
  size,
  showButton = false,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="card h-100 shadow-sm border-0 text-center">
      <img
        src={imageUrl}
        className="card-img-top"
        alt={name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-semibold">{name}</h5>
        <p className="text-muted small flex-grow-1">
          Color: {color}, Size: {size}
        </p>
        <p className="fw-bold mb-1">Price: ${price}</p>

        {showButton && (
          <div className="mt-auto">
            <PrimaryButton 
                text="View Details" 
                onClick={handleCardClick} 
          />
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductCard;
