import React from "react";

export default function Button({ onClick, text }) {
  return (
    <button
      className="bg-brand text-white py-1 px-3 rounded-full hover:brightness-110 text-sm"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
