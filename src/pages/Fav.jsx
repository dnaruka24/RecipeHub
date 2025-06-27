import RecipeCard from "./../components/RecipeCard";

const Fav = () => {
  const favorite = JSON.parse(localStorage.getItem("fav") || "[]");

  const renderrecipes = favorite.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ));
  return (
    <div className="flex flex-wrap">
      {favorite.length > 0 ? renderrecipes : "No recipes found!"}
    </div>
  );
};

export default Fav;
