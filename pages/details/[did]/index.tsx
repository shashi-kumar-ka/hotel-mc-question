import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../src/store/store";
// import Image from "next/legacy/image";
import { useRouter } from "next/router";
import BackIcon from "../../../src/components/BackIcon";
import FavoriteIcon from "../../../src/components/FavoriteIcon";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../src/store/hotelSlicer";

const HotelDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { did } = router.query;

  const hotel = useSelector((state: RootState) =>
    state.hotels.hotels.find((hotel) => hotel.id === did)
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (hotel && hotel.favorite) {
      dispatch(addToFavorites(hotel.id));
    }
  }, [dispatch, hotel]);

  if (!hotel || loading) return <div>Loading...</div>;

  const { image, price, name, location, description, favorite } = hotel;

  const handleGoBack = () => {
    if (favorite) {
      dispatch(addToFavorites(hotel.id));
    } else {
      dispatch(removeFromFavorites(hotel.id));
    }
    router.back();
  };

  const toggleFavorite = () => {
    if (favorite) {
      dispatch(removeFromFavorites(hotel.id));
    } else {
      dispatch(addToFavorites(hotel.id));
    }
  };

  return (
    <div>
      <div className="sticky top-0 left-0 z-10 bg-white">
        <div className="absolute z-1000 w-full flex justify-between px-4 py-4 items-center">
          <button
            onClick={handleGoBack}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white cursor-pointer"
          >
            <BackIcon />
          </button>
          <button
            onClick={toggleFavorite}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white cursor-pointer"
          >
            <FavoriteIcon favorite={favorite} />
          </button>
        </div>
        <div>
          {/* <Image
            src={image}
            alt={name}
            width={400}
            height={1080}
            layout="responsive"
            priority
            className="w-screen t-0"
          /> */}
          <img src={image} alt={name} className="w-screen t-0" />
        </div>
        <div className="px-4 py-2">
          <p className="font-semibold">₹{price.toLocaleString()}</p>
          <hr className="mt-4" />
        </div>
      </div>
      <div className="px-8 py-2">
        <p className="text-gray-400">hotel in {location}</p>
        <p className="font-semibold text-xl my-2">{name}</p>
        <p
          className="text-sm text-gray-600 font-normal mb-12"
          style={{ maxHeight: "550px", overflow: "hidden", overflowY: "auto" }}
          dangerouslySetInnerHTML={{ __html: description || "" }}
        ></p>
      </div>

      <footer className="fixed bottom-0 left-0 w-full bg-white ">
        <div className="px-4">
          <hr />
        </div>
        <div className="text-left px-8 py-4">
          ₹{price.toLocaleString()}{" "}
          <span style={{ color: "#888888" }}>/ night (all inc.)</span>
        </div>
      </footer>
    </div>
  );
};

export default HotelDetails;
