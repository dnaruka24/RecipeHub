import { Link } from "react-router";

const RecipeCard = (props) => {
  const { id, image, title, description, chef } = props.recipe;
  return (
    <Link
      to={`/recipes/details/${id}`}
      className="mr-3 mb-3 block w-[23vw] rounded overflow-hidden shadow hover:scale-105 duration-150"
    >
      <img className="object-cover w-full h-[20vh]" src={image} alt="" />
      <h1 className="mt-2 px-2 font-black">{title}</h1>
      <small className="px-2 text-red-400">{chef}</small>
      <p className="px-2 pb-3">
        {description.slice(0, 100)}...{""}
        <small className="text-blue-400">more</small>
      </p>
    </Link>
  );
};

export default RecipeCard;
