import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorites,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();
      if (data?.data) {
        setRecipeDetailsData(data.data);
      }
    }
    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.recipe?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-grey">
          {recipeDetailsData?.recipe?.title}
        </h3>
        <h6>{recipeDetailsData?.recipe?.cooking_time} Cooking Times</h6>

        <div>
          <div>
            <button
              onClick={() => handleAddToFavorites(recipeDetailsData?.recipe)}
              className="p-3 px-8 rounded-lg text-sm font-medium tracking-wider mt-3 inline-block shadow-md bg-light"
            >
              {favoritesList.findIndex(
                (item) => item.id === recipeDetailsData?.recipe?.id
              ) !== -1
                ? "Remove from Favorites"
                : "Save in Favorites ❤️"}
            </button>
          </div>
          <span className="text-1xl font-semibold text-light mb-4 mt-4 inline-block">
            Ingredients
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetailsData?.recipe?.ingredients.map((ingredient, index) => (
              <li key={index}>
                <span className="text-1xl text-gray">
                  {ingredient.quantity} {ingredient.unit}
                </span>{" "}
                <span className="text-1xl text-gray">
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
