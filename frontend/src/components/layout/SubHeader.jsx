import React, { useRef } from "react";
import { TiThMenu } from "react-icons/ti";
import { GET_BRANDS } from "../../graphql/queries";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import useScrollOnDrag from "react-scroll-ondrag";

const SubHeader = ({ toggleDrawer }) => {
  const { data: brandsData, loading } = useQuery(GET_BRANDS);
  const containerRef = useRef(null);
  const { events } = useScrollOnDrag(containerRef, {});

  return (
    <div className="flex gap-6 items-center flex-row justify-start  bg-slate-50 py-0 px-2">
      <div
        className="flex items-center justify-center hover:cursor-pointer hover:bg-slate-200 py-2 text-gray-900 px-2 rounded"
        onClick={toggleDrawer(true)}
      >
        <TiThMenu className="text-black" size={20} />
        <p className="ml-2 text-sm font-bold uppercase">Categories</p>
      </div>
      <div
        className="flex overflow-hidden whitespace-nowrap gap-5 py-5"
        {...events}
        ref={containerRef}
      >
        {loading ? (
          <div className="h-5 flex gap-5">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="w-20 bg-slate-200 animate-pulse rounded"
              ></div>
            ))}
          </div>
        ) : (
          <>
            {brandsData?.brands?.slice(0, 25).map((brand, index) => (
              <div className="flex gap-5" key={index}>
                <Link
                  key={index}
                  to={`/products/brands/${brand
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-z0-9\s-]/gi, "")
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  <p className="text-sm text-gray-500 font-mono w-max uppercase font-bold hover:text-gray-900">
                    {brand}
                  </p>
                </Link>
                <p className="text-gray-300 text-sm">/</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SubHeader;
