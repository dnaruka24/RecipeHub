import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { recipecontext } from "../context/RecipeContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SingleRecipe = () => {
  const { data, setdata } = useContext(recipecontext);
  const navigate = useNavigate();
  const params = useParams();
  const recipe = data.find((recipe) => params.id == recipe.id);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: recipe?.title,
      chef: recipe?.chef,
      image: recipe?.image,
      instructions: recipe?.instructions,
      description: recipe?.description,
      ingredients: recipe?.ingredients,
    },
  });

   const [favorite, setfavorite] = useState(
    JSON.parse(localStorage.getItem("fav")) || []
  );

  let UpdatetHandler = (recipe) => {
    const index = data.findIndex((recipe) => params.id == recipe.id);
    const copydata = [...data];
    copydata[index] = { ...copydata[index], ...recipe };
    setdata(copydata);
    localStorage.setItem("recipes", JSON.stringify(copydata));
    toast.success("Recipe updated");
  };

  const DeleteHandler = (e) => {
    e.preventDefault();
    const filterdata = data.filter((r) => r.id != params.id);
    setdata(filterdata);
    localStorage.setItem("recipes", JSON.stringify(filterdata));
    const filteredFav = favorite.filter((f) => f.id !== params.id);
      localStorage.setItem("fav", JSON.stringify(filteredFav));
    toast.success("Recipe Deleted");
    navigate("/recipes");
  };

 

  const FavHandler = () => {
    let copyfav = [...favorite];
    copyfav.push(recipe);
    setfavorite(copyfav)
    localStorage.setItem("fav", JSON.stringify(copyfav));
        toast.success("Recipe added to favorites");

  };
  const UnFavHandler = () => {
    const filterfav = favorite.filter((f) => f.id != recipe?.id);
    setfavorite(filterfav);
    localStorage.setItem("fav", JSON.stringify(filterfav));
  };

  useEffect(() => {
    console.log("mounted");
    return() => {
      console.log("unmounted");
    }
  }, []);

  return recipe ? (
    <div className="w-full flex">
      <div className="relative left w-1/2 p-10">
        {favorite.find((f) => f.id == recipe?.id) ? (
          <i
            onClick={UnFavHandler}
            className="text-3xl text-red-400 right-[5%] absolute ri-heart-fill"
          ></i>
        ) : (
          <i
            onClick={FavHandler}
            className="text-3xl text-red-400 right-[5%] absolute ri-heart-line"
          ></i>
        )}

        <h1 className="text-5xl font-black">{recipe.title}</h1>
        <img className="h-[25vh] rounded mt-5" src={recipe.image} alt="" />
        <h1 className="mt-3 font-bold">{recipe.chef}</h1>
        <hr className="mt-2 mb-2" />
        <p>{recipe.description}</p>
      </div>

      <form onSubmit={handleSubmit(UpdatetHandler)}>
        <input
          className="block outline-0 border-b p-2"
          type="url"
          {...register("image")}
          placeholder="Enter image URL"
        />

        <small className="text-red-400">* dhyaan se dekh</small>

        <input
          className="block outline-0 border-b p-2"
          type="text"
          placeholder="Recipe Title"
          {...register("title")}
        />

        <small className="text-red-400">* dhyaan se dekh</small>

        <input
          className="block outline-0 border-b p-2"
          type="text"
          placeholder="Chef's Name"
          {...register("chef")}
        />

        <small className="text-red-400">* dhyaan se dekh</small>

        <textarea
          className="block outline-0 border-b p-2"
          placeholder="//About Recipe"
          {...register("description")}
        ></textarea>

        <small className="text-red-400">* dhyaan se dekh</small>

        <textarea
          className="block outline-0 border-b p-2"
          placeholder="//write ingredients separeted by comma"
          {...register("ingredients")}
        ></textarea>

        <small className="text-red-400">* dhyaan se dekh</small>

        <textarea
          className="block outline-0 border-b p-2"
          placeholder="//write instruction separeted by comma"
          {...register("instructions")}
        ></textarea>

        <small className="text-red-400">* dhyaan se dekh</small>

        <select
          className="block outline-0 border-b p-2"
          {...register("category")}
        >
          <option className="text-black" value="breakfast">
            Breakfast
          </option>
          <option className="text-black" value="lunch">
            Lunch
          </option>
          <option className="text-black" value="supper">
            Supper
          </option>
          <option className="text-black" value="dinner">
            Dinner
          </option>
        </select>

        <button className="block mt-5 bg-blue-600 hover:bg-blue-900 active:bg-blue-700 px-4 py-2 rounded">
          Update Recipe
        </button>
        <button
          onClick={DeleteHandler}
          className="block mt-5 bg-red-700 hover:bg-red-900 active:bg-red-800 px-4 py-2 rounded"
        >
          Delete Recipe
        </button>
      </form>
    </div>
  ) : (
    "Loading..."
  );
};

export default SingleRecipe;
