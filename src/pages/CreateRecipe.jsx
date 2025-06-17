import { nanoid } from "nanoid";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { recipecontext } from "../context/RecipeContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const CreateRecipe = () => {
  const navigate = useNavigate();
  const { data, setdata } = useContext(recipecontext);
  const { register, handleSubmit, reset } = useForm();

  let SubmitHandler = (recipe) => {
    recipe.id = nanoid();
    const copydata =[...data]
    copydata.push(recipe)
    setdata(copydata)
    localStorage.setItem('recipes', JSON.stringify(copydata))
    setdata([...data, recipe]);
    toast.success("New recipe created!");
    reset();
    navigate("/recipes");
  };

  return (
    <form onSubmit={handleSubmit(SubmitHandler)} >
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

      <button className="block mt-5 bg-gray-900 px-4 py-2 rounded">
        Save Recipe
      </button>
    </form>
  );
};

export default CreateRecipe;
