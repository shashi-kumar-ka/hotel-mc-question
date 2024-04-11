import React from "react";
import { HotelListItemProps } from "./type";
// import Image from "next/legacy/image";
import { useRouter } from "next/router";

const HotelListItem: React.FC<HotelListItemProps> = ({ hotel }) => {
  const router = useRouter();

  if (!hotel) {
    return null;
  }

  const { id, name, price, image, freeBreakfast } = hotel;

  const typeOfBreakfast = freeBreakfast ? "Free Breakfast" : "Paid Breakfast";

  const breakfastClassName = freeBreakfast ? "text-green-500" : "text-red-500";

  return (
    <div
      className="mt-4 mb-1"
      onClick={() => router.push(`/details/${id}`)}
    >
      <div>
        {/* <Image
          src={image}
          alt={`hotel_${name}`}
          width={360}
          height={960}
          layout="responsive"
          priority
          className="w-screen rounded-lg"
        /> */}
        <img src={image} alt={name} className="rounded-lg"/>
      </div>
      <div>
        <p className="font-semibold mt-1">{name}</p>
        <p className="font-semibold mt-1">₹{price.toLocaleString()}</p>
        <p className={`mt-1 font-medium text-sm ${breakfastClassName}`}>
          {typeOfBreakfast}
        </p>
      </div>
    </div>
  );
};

export default HotelListItem;
