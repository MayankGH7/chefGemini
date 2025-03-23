import { JSX } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IngredientsListProps {
  ingredients: string[];
  generateRecipe: () => void;
  btnContent: string | JSX.Element;
  recipeSection: React.RefObject<HTMLDivElement | null>;
}

const IngredientsList = ({ ingredients, generateRecipe, btnContent, recipeSection}: IngredientsListProps) => {
  return (
    <>
    <div className="mt-10">
      <h1 className="text-4xl font-medium mb-10">Ingredients on Hand:</h1>
      <ul className="list-disc pl-4">
        {ingredients.map(ing => <li key={uuidv4()} className="text-lg">{ing[0].toUpperCase() + ing.slice(1).toLowerCase()}</li>)}
      </ul>
    </div>
    { ingredients.length > 3 &&
    <div ref={recipeSection} className="p-7 dark:bg-[#222] dark:shadow-[none] shadow-[0_0_10px] rounded-2xl my-10 flex flex-wrap justify-between items-end gap-5">
      <div>
        <h3 className="text-xl font-medium">Ready for recipe?</h3>
        <p className="text-gray-400">Generate a recipe from your list of ingredients.</p>
      </div>
      <button onClick={generateRecipe} className="bg-amber-600 text-white py-2 px-3 font-bold rounded-xl whitespace-nowrap cursor-pointer shadow-[0px_0px_20px] shadow-amber-600">{btnContent}</button>
    </div> }
    </>
  )
}

export default IngredientsList;