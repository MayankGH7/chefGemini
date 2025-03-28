import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export default async (ingredients: string[]): Promise<string | Error> => {
  const llm = new ChatGoogleGenerativeAI({
    modelName: "gemini-2.0-flash",
    apiKey: localStorage.getItem("GOOGLE_API_KEY")! 
  })

  try{
    const response = await llm.invoke(
      [
        {
          role: "system",
          content: "You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. H1 heading for name of recipe (which should always be first text ) and h2 heading for headings like Instruction and Ingredients"
        },
        {
          role: "user",
          content: `I have ${ingredients.join(", ")}. Please give me a recipe you'd recommend I make!` 
        }
      ]
    )
    .then(response => {
      return response.content as string;
    });
    return response;
  }catch{
    return Error("API KEY not valid or some error occured")
  };
}