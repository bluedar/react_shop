import React from "react";
import CartItem from "../components/CartItem";
import { useAuthContext } from "../components/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import Button from "../components/ui/Button";
import { PiEqualsBold, PiPlusBold } from "react-icons/pi";

const SHIPPING = 3000; //배송액

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(["carts", uid || ""], () =>
    getCart(uid)
  );
  if (isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0; //쇼핑카트에 아이테이 있는지 검사

  const totalprice =
    products &&
    products.reduce(
      (sum, value) => sum + parseInt(value.price) * value.quantity,
      0
    );

  return (
    <section className="w-full max-w-screen-xl m-auto py-24 md:py-40">
      <div>
        <h2 className="text-center text-2xl">내 장바구니</h2>
        <div>
          <ul className="border-b border-pink-300 mb-8 p-4 px-8">
            {!hasProducts && (
              <p className=" py-20 text-center">장바구니에 상품이 없습니다.</p>
            )}
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div className="flex justify-between items-center mb-8">
            <div>
              상품총액 <p>{totalprice}원</p>
            </div>
            <PiPlusBold />
            <div>
              {" "}
              배송액<p>{SHIPPING}원</p>
            </div>
            <PiEqualsBold />{" "}
            <div>
              총가격<p> {totalprice + SHIPPING}원</p>
            </div>
          </div>
          <div className="">
            <Button text="주문하기" />
          </div>
        </div>
      </div>
    </section>
  );
}
