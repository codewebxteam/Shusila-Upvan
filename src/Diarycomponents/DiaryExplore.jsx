// src/components/ExploreDiaryButton.jsx
import { useNavigate } from "react-router-dom";

const ExploreDiaryButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/diary"); // navigate to correct route
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Explore Diary
    </button>
  );
};

export default ExploreDiaryButton;
