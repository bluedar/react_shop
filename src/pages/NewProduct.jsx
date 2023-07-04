import React, { useState } from "react";
import Button from "../components/ui/Button";
import { uploadImage } from "../api/uploader";
import { addNewProduct } from "../api/firebase";
export default function NewProduct() {
  const [product, setProduct] = useState({}); //각각의 제품의 입력값을 모아주는 오브젝트
  const [file, setFile] = useState(); // 이미지를 임시로 저장(로컬의 이미지 주소,url 저장)
  const [isUploading, setIsUploading] = useState(false); // 업로드중
  const [succes, setSucces] = useState(); // 성공표시

  const handleChange = (e) => {
    // console.log(e.target.files);
    const { name, value, files } = e.target;
    if (name === "img") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
    console.log(product);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);

    uploadImage(file) //클라우드너리에 이미지를 업로드
      .then((url) => {
        //이미지 주소 받아옴
        console.log(url);
        addNewProduct(product, url) // 파이어베이스에 자료를 업로드
          .then(() => {
            setSucces("성공적으로 제품이 추가되었습니다.");
            setTimeout(() => {
              setSucces(null);
            }, 4000);
          });
      })
      .finally(() => setIsUploading(false));
  };
  return (
    <section className="w-full max-w-xl m-auto pt-36">
      {succes ? (
        <p className=" text-center text-2xl pb-6"> 🐣{succes}</p>
      ) : (
        <h2 className=" text-center text-2xl pb-6">새로운 제품 등록</h2>
      )}
      {file && (
        <img
          className=" h-52 mx-auto mb-2"
          src={URL.createObjectURL(file)}
          alt="localFile"
        />
      )}
      <form className="flex flex-col py-10" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="img"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="제품명"
          onChange={handleChange}
          vlaue={product.title ?? ""}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="가격"
          onChange={handleChange}
          vlaue={product.price ?? ""}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="카테고리"
          onChange={handleChange}
          vlaue={product.category ?? ""}
          required
        />
        <input
          type="text"
          name="dexcription"
          placeholder="제품설명"
          onChange={handleChange}
          vlaue={product.dexcription ?? ""}
          required
        />
        <input
          type="text"
          name="options"
          placeholder="옵션들(콤마(,)로 구분)"
          onChange={handleChange}
          vlaue={product.options ?? ""}
          required
        />
        <Button text={isUploading ? "업로드중..." : "제품 등록하기"} />
      </form>
    </section>
  );
}
