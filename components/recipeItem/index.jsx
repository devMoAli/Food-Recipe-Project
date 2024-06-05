import React from "react";
import { Link } from "react-router-dom";

function RecipeItem({ item }) {
  return (
    <div className="flex flex-col w-80 overflow-hidden p-5 bg-whiye/75 shadow-xl gap-5 border rounded-2xl border-white">
      <div className="h-40 flex justify-center overflow-hidden items-center rounded-xl">
        <img src={item?.image_url} alt="recipe item" className="block w-full" />
      </div>
      <div>
        <span className="text-sm text-cyan-700 font-medium">
          {item?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-grey">{item?.title}</h3>
        <Link
          to={`/recipe-item/details/${item?.id}`}
          className="text-sm mt-5 p-3 px-8 rounded-lg font-medium tracking-wider inline-block shadow-md bg-light text-white "
        >
          Recipe Details
        </Link>
      </div>
    </div>
  );
}

export default RecipeItem;
