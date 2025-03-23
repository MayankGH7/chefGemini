import ReactMarkdown from "react-markdown";

const ChefGeminiRecipe = ({recipe}: {recipe: string}) => {

  return (
    <section className="recipe-section prose dark:prose-invert">
      <h1 className="not-gemini-text"><p>Chef Gemini Recommends: </p></h1>
      <ReactMarkdown>
        {recipe}
      </ReactMarkdown>
    </section>
  )
}

export default ChefGeminiRecipe;