import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { addOrUpdateToCart } from "../api/firebase";
import { useAuthContext } from "../components/context/AuthContext";
import Button from "../components/ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductDetail() {
  const { uid } = useAuthContext();
  const {
    state: {
      product: { id, category, description, image, options, price, title },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const [succes, setSucces] = useState(); // 성공표시

  //useQuery Mutation 사용- 실시간 업데이트를 위해
  const queryClient = useQueryClient();
  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateToCart(uid, product),
    {
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
      // cart키를 가진 쿼리를 무효화 (+uid를 확인하고 바로 업데이트 해줘!)
    }
  );

  const handleSelect = (e) => {
    setSelected(e.target.value);
    console.log("select에서 발생하는 이벤트 e.target.value", e.target.value);
  };
  const handleClick = (e) => {
    //장바구니에 추가
    const product = { id, title, image, options: selected, price, quantity: 1 };
    //addOrUpdateToCart(uid, product);
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSucces("장바구니에 추가되었습니다.");
        setTimeout(() => {
          setSucces(null);
        }, 3000);
      },
    });
  };

  return (
    <div className="w-full max-w-screen-xl m-auto py-24 md:py-40">
      <section className="flex flex-col md:flex-row">
        <img src={image} alt={title} />
        <div className="">
          <p>여성의류 / {category}</p>
          <h2>{title}</h2>
          <p>{`₩${price}`}</p>
          <p>{description}</p>
          <div>
            <label htmlFor="select">옵션</label>
            <select
              name=""
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          {succes && <p className=" text-center text-2xl pb-6"> 🐣{succes}</p>}
          <Button onClick={handleClick} text="장바구니에 추가" />
        </div>
      </section>
    </div>
  );
}
