import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  product: { id, image, title, price, category },
}) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      className=" rounded-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer pb-6"
    >
      <img className="w-full" src={image} alt={title} />
      <div className="flex justify-between items-center mt-8 mb-2 px-4">
        <h3 className="truncate">{title}</h3>
        <p className="text-red-700 text-sm">{`${price}원`}</p>
      </div>
      <p className="text-sm text-slate-400 pl-2">{category}</p>
    </li>
  );
}
