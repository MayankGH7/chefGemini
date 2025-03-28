import { useState, JSX, useEffect, useRef } from "react"
import chefGemini from "../util/gemini";
import ChefGeminiRecipe from "./ChefGeminiRecipe";
import IngredientsList from "./IngredientsList";

export default function Main(){
  const [ingredients, setIngredient] = useState<string[]>([]);
  const [recipe, setRecipe] = useState("");
  const [btnContent, setBtnContent] = useState<JSX.Element | string>("Get a Recipe");
  const recipeSection = useRef<HTMLDivElement>(null);

  function addIngredient(formData: FormData){ 
    setIngredient((prev) => [...prev, formData.get("ingredient") as string])
  }

  function handleApiKey(){
    const getApiKey = localStorage.getItem("GOOGLE_API_KEY");
    if(getApiKey == "null" || !getApiKey){
      const API_KEY = prompt("Enter your Gemini API KEY :");
      if(typeof API_KEY  == "string"){
        localStorage.setItem("GOOGLE_API_KEY", API_KEY);
      }
    };
  };
  useEffect(() => {
    handleApiKey();
  }, []);

  useEffect(() => {
    if (recipe && recipeSection) recipeSection.current!.scrollIntoView({behavior: "smooth"});
  }, [recipe])

  function generateRecipe(){
    setBtnContent(<><div className="size-4 border-3 border-b-transparent inline-block animate-spin rounded-full align-[-5%]"></div> <span className="inline-block">Making</span></>)

    chefGemini(ingredients).then((response) => {
      setBtnContent("Get a Recipe");
      if(response instanceof Error){
        alert(response.message);
        localStorage.removeItem("GOOGLE_API_KEY");
        handleApiKey();
        return;
      };
      setRecipe(response);
    });
  }

  return (
      <main className="mt-10 flex justify-center items-center">
        <div className="px-5 xs:w-[567px]">

          <form id="ingForm" action={addIngredient} className="flex flex-wrap justify-end gap-4 ">
            <input className="border-2 rounded-xl px-3 grow h-10 dark:bg-[#111] dark:text-white text-black" required type="text" name="ingredient" id="ingredient" placeholder="e.g. oregano" />
            <button type="submit" className="dark:bg-white dark:text-black bg-black text-white py-2 px-4 rounded-xl font-bold cursor-pointer dark:shadow-[0_0_7px_white] shadow-[0_0_7px_black]">+ Add ingredient</button>
          </form>

          { ingredients.length > 0 &&  
            <>
            <IngredientsList 
              ingredients={ingredients}  
              generateRecipe={generateRecipe} 
              btnContent={btnContent} 
              recipeSection={recipeSection} />

            {recipe && <ChefGeminiRecipe recipe={recipe} />}
            </>
          }

        </div>
      </main>
  )
}
