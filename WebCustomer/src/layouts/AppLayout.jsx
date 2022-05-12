import React from "react";
import { Link } from "react-router-dom";

export default function AppLayout({ children }) {
  return (
    <>
      <div className="bg-white drop-shadow container mx-auto md:px-20">
        <div className="py-4">
          <Link to={"/"} className="text-xl font-bold">
            MedPro
          </Link>
        </div>
      </div>
      <div className="py-12">{children}</div>
      <div className="container mx-auto md:px-20">
        <div className="py-4 text-center">
          Make with {"</>"} by <b>Hậu Nguyễn</b>
        </div>
      </div>
    </>
  );
}
