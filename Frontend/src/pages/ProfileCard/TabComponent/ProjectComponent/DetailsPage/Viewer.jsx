import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PacmanLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Viewer = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const images = JSON.parse(decodeURIComponent(queryParams.get("images")));
  const startIndex = parseInt(queryParams.get("start"), 10);

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [showPrevIcon, setShowPrevIcon] = useState(false);
  const [showNextIcon, setShowNextIcon] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false); // Overlay state
  const navigate = useNavigate();

  // Adding an array of products with details
  const products = [
    { id: 1, name: "Product 1", description: "Description of product 1" },
    { id: 2, name: "Product 2", description: "Description of product 2" },
    { id: 3, name: "Product 3", description: "Description of product 3" },
    { id: 4, name: "Product 4", description: "Description of product 4" },
  ];

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/blank");
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div
      style={{
        textAlign: "center",
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
      }}
      onMouseMove={(e) => {
        const { clientX } = e;
        const { innerWidth } = window;
        setShowPrevIcon(clientX < innerWidth / 2);
        setShowNextIcon(clientX >= innerWidth / 2);
      }}
      onMouseLeave={() => {
        setShowPrevIcon(false);
        setShowNextIcon(false);
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
          }}
        >
          <PacmanLoader color="orange" size={50} />
        </div>
      )}

      <div
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          overflow: "auto",
          position: "relative",
        }}
      >
        <img
          src={images[currentIndex]}
          alt={`Thumbnail ${currentIndex + 1}`}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            position: "relative",
            cursor: "pointer",
          }}
          onLoad={handleImageLoad}
          onError={() => setLoading(false)}
          onClick={() => setShowOverlay(true)} // Show overlay on click
        />
      </div>

      {/* Overlay for options */}
      {showOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "#fff",
            zIndex: 10,
          }}
          onClick={() => setShowOverlay(false)}
        >
          <div
            style={{
              backgroundColor: "#222",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{products[currentIndex]?.name}</h2> {/* Product name */}
            <p>{products[currentIndex]?.description}</p> {/* Product description */}
            <button
              style={{
                backgroundColor: "orange",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: "16px",
              }}
              onClick={() => navigate("/checkout")}
            >
              Purchase
            </button>
          </div>
        </div>
      )}

      {/* Previous Image Button */}
      {showPrevIcon && currentIndex > 0 && (
        <div
          onClick={prevImage}
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            zIndex: 1,
          }}
        >
          <FaChevronLeft size={30} />
        </div>
      )}

      {/* Next Image Button */}
      {showNextIcon && (
        <div
          onClick={nextImage}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            zIndex: 1,
          }}
        >
          <FaChevronRight size={30} />
        </div>
      )}
    </div>
  );
};

export default Viewer;
