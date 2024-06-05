import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await response.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
      }
      //   console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  }
  function handleAddToFavorites(getCurrentItem) {
    console.log(getCurrentItem);
    let cpyFavoritesList = [...favoritesList];
    // check if item is present in this array or not
    const index = cpyFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    // if item not present means -1 so add it on click
    if (index === -1) {
      // add item to array
      cpyFavoritesList.push(getCurrentItem);
      // or remove it on another click
    } else {
      cpyFavoritesList.splice(index);
    }
    setFavoritesList(cpyFavoritesList);
  }

  console.log("favoritesList", favoritesList);
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorites,
        favoritesList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
