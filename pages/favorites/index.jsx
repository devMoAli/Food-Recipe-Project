import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipeItem";

export default function Favorites() {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((item) => <RecipeItem item={item} />)
      ) : (
        <div>
          <p className="lg:text-1xl text-xl text-center text-gray">
            Nothing is added to Favorites ...
          </p>
        </div>
      )}
    </div>
  );
}
