'use server'
import Groq from "groq-sdk";

interface contentGenProps {
    prompt: string;
    customInstructions?: string;
    contentGen: boolean;
}

const llm = new Groq({
    apiKey: process.env.GROQ_API_KEY!
})

export async function AIContentGenerator({ prompt, customInstructions, contentGen }: contentGenProps) : Promise<string> {

    let basePrompt

    if (contentGen) {
        basePrompt =
            `You're a senior and experienced content. You're asked to compose an elaborated, fact checked content.\
          The content should be properly bulleted using numbers and headings.\
          The content topic is given as follows: ${prompt}\
          Below are the custom instructions for the content: ${customInstructions}\
          `
    } else {
        basePrompt =
          `You're a senior content reviewer. Your task will be to go through the given content and rewrite in easy to understand language.\
          The content you need to rephrase is given as follows: ${prompt}\
          Below are the custom instructions for the content: Do not reply with "Here's the paraphrased content:" or any other similar text. Just return the paraphrased content. ${customInstructions}\
          `
    }

    try {
        const completion = await llm.chat.completions
            .create({
                messages: [
                    {
                        role: "user",
                        content: basePrompt,
                    },
                ],
                model: "llama-3.3-70b-versatile",
                max_tokens: contentGen ? 1500 : 500,
            })
        const content = completion.choices[0].message.content as string
        return content
    } catch (error) {
        console.error('Error generating content:', error)
        return "An error occurred while generating content."
    }

}

