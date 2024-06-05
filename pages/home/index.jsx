import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipeItem";

export default function Home() {
  const { loading, recipeList } = useContext(GlobalContext);
  if (loading) return <div>Loading...</div>;

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <div>
          <p className="lg:text-1xl text-xl text-center text-gray">
            Nothing to show for this search, please search another recipe ...
          </p>
        </div>
      )}
    </div>
  );
}
