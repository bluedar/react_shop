import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
//import { login, logout, onUserStateChange } from "../api/firebase";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "./context/AuthContext";
import CartStatus from "./CartStatus";

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  // const [user, setUser] = useState(); //로그인 여부(로그인 정보)

  // //화면이 마운트(리로드 될때) 로그인이 되어있는 아닌지 상태를 알아보는 함수 호출
  // useEffect(() => {
  //   onUserStateChange((user) => {
  //     setUser(user);
  //     console.log("user", user);
  //   });
  // }, []);

  return (
    <div className=" fixed w-full z-10  text-slate-500 hover:text-black hover:bg-white bg-slate-500 bg-opacity-5 transition-all duration-300">
      <div className="w-full max-w-screen-2xl m-auto">
        <header className="flex justify-between items-center gap-2 p-2 md:p-5">
          <Link to="/">
            <h1 className="text-xl md:text-3xl font-logoFont tracking-nomal">
              &OTHER<span className="pl-3 md:pl-6">STORIES</span>
            </h1>
          </Link>

          <nav className="flex items-center gap-4">
            <Link to="/products">Product</Link>
            {user && (
              <Link to="/cart" className=" mr-2">
                <CartStatus />
              </Link>
            )}
            {user && user.isAdmin && (
              <Link to="/products/new">
                <HiPencilAlt />
              </Link>
            )}
            {user && <User user={user} />}
            {!user && <Button onClick={login} text={"login"} />}
            {user && <Button onClick={logout} text={"logout"} />}
          </nav>
        </header>
      </div>
    </div>
  );
}
