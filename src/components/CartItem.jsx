import React from "react";
import { PiMinusSquareLight, PiPlusSquareLight, PiXBold } from "react-icons/pi";
import { addOrUpdateToCart, removeFromCart } from "../api/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CartItem({
  product,
  product: { id, image, title, options, price, quantity },
  uid,
}) {
  const queryClient = useQueryClient();
  const addOrUpdatePlus = useMutation(
    (product) => addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 }),
    {
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
      // cart키를 가진 쿼리를 무효화 (+uid를 확인하고 바로 업데이트 해줘!)
    }
  );
  const addOrUpdateMinus = useMutation(
    (product) => addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 }),
    {
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
      // cart키를 가진 쿼리를 무효화 (+uid를 확인하고 바로 업데이트 해줘!)
    }
  );
  const removeCart = useMutation(() => removeFromCart(uid, id), {
    onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
    // cart키를 가진 쿼리를 무효화 (+uid를 확인하고 바로 업데이트 해줘!)
  });

  const handleMinus = () => {
    if (quantity < 2) return; //1일땐 더이상 빼줄 수 없음!!
    addOrUpdateMinus.mutate(product);
  };
  const handlePlus = () => {
    addOrUpdatePlus.mutate(product);
  };
  const handleDelete = () => removeCart.mutate(uid, id);

  return (
    <li className="flex justify-between my-2 items-center border-b-2  border-pink-300 pb-2">
      <img className="w-24 md:w-36 rounded-lg" src={image} alt={title} />
      <div className="flex-1 flex justify-between ml-4">
        <div className="">
          <p className="text-lg truncate">{title}</p>
          <p className="text-xl text-brand">{options}</p>
          <p>{`₩${price}`}</p>
        </div>
        <div className="flex items-center gap-2 text-xl">
          <PiMinusSquareLight
            className="text-slate-400"
            onClick={handleMinus}
          />
          <span>{quantity}</span>
          <PiPlusSquareLight className="text-slate-400" onClick={handlePlus} />
          <PiXBold className="text-2xl" onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
