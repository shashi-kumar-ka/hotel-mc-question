import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/store/store";
import { setHotels } from "../src/store/hotelSlicer";
import HotelListItem from "../src/components/HotelListItem";

const HomePage = memo(function HomePage() {
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotels.hotels);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (hotels.length === 0) {
      fetch("https://mocki.io/v1/fd643dc8-4c4b-410d-a99f-31af8bdf751f")
        .then((response) => response.json())
        .then((data) => {
          dispatch(setHotels(data));
        })
        .catch((error) => {
          console.error("Error fetching hotels: ", error);
        });
    }
  }, [dispatch, hotels]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const displayedHotels = showFavorites
    ? filteredHotels.filter((hotel) => hotel.favorite)
    : filteredHotels;

  return (
    <div className="px-4 py-3 h-screen w-screen mx-auto">
      <div className="sticky top-0 left-0 right-0 bg-white z-10">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="flex items-center justify-center w-full h-12 border border-gray-300 rounded-lg px-3 mb-3"
        />

        <button
          className="flex items-center justify-center w-auto h-9 border border-gray-300 rounded-3xl p-3 font-medium"
          onClick={handleToggleFavorites}
        >
          {showFavorites ? "All Hotels" : "Favorites"}
        </button>
      </div>

      <div>
        {displayedHotels.map((hotel) => (
          <HotelListItem key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
