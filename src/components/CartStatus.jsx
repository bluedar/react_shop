import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BsFillHandbagFill } from "react-icons/bs";
import { useAuthContext } from "./context/AuthContext";
import { getCart } from "../api/firebase";

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery(
    ["carts", uid || ""],
    () => getCart(uid),
    {
      staleTime: 1000,
    }
  );

  return (
    <div className=" relative">
      <BsFillHandbagFill />
      {products && (
        <p className="absolute -top-1 -right-2 text-sm font-extralight">
          {products.length}
        </p>
      )}
    </div>
  );
}
