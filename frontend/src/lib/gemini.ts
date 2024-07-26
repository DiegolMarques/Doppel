import dotenv from 'dotenv';
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GENERATIVE_AI_API_KEY);

async function chatDoppel(conversationHistory: string, name: string, gender: string, race: string, age: number, nationality: string, city: string, occupation: string, personality: string): Promise<string> {
  const age_string = age.toString();
      const setup = `i am going to give you a set of parameters that model a person, and i from this message forward i want you to emulate the personality of this person as accurately as possible (act as if you are them): Name: ${name} Gender: ${gender} Age: ${age_string} Race: ${race} Nationality: ${nationality} City: ${city} Occupation: ${occupation} Personality: ${personality} `;
      const history = `this is the history of conversation between the user and the person you are emulating (continue where this conversation left off): ${conversationHistory}`;
      const prompt = setup + history;
      // console.log("api key is: "+ process.env.NEXT_PUBLIC_GENERATIVE_AI_API_KEY);

      try {

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const result = await model.generateContent(prompt);
        const response = result.response;
        // console.log("result is: "+ response.text());
        return(response.text());

      } catch (error) {
        console.error("Error fetching response:", error);
        return("An error occurred while fetching the response.");
      }
}

function parseIndividuals(input: string): string[][] {
  const individuals: string[][] = [];
  const individualDescriptions = input.split(/Individual \d+/).slice(1);

  for (const description of individualDescriptions) {
    const individual: string[] = [];
    const parameters = [
      "Name:",
      "Gender:",
      "Age:",
      "Race:",
      "Nationality:",
      "City:",
      "Occupation:",
      "Personality:",
      "Bio:"
    ];

    for (let i = 0; i < parameters.length; i++) {
      const currentParam = parameters[i];
      const nextParam = parameters[i + 1] || '$';
      const regex = new RegExp(`${currentParam}(.+?)(?=\\n+\\*+\\s*${nextParam}|$)`, 's');
      const match = description.match(regex);
      
      if (match) {
        // Trim the extracted content and remove trailing newlines and stars
        individual.push(match[1].trim().replace(/\n+\*+$/, ''));
      } else {
        individual.push('');
      }
    }

    individuals.push(individual);
  }

  return individuals;
}

async function generateDoppels(number: string, gender: string, race: string, age_range: string, nationality: string, city: string, occupation: string, personality: string): Promise<string[][] | string> {
  const prompt = 
  `generate a list of ${number} unique people based on these parameters:

  Name:

  Gender: ${gender}

  Age Range: ${age_range}

  Race: Random

  Nationality: ${nationality}

  City: ${city}

  Occupation: ${occupation}

  Personality: ${personality}

  Bio: Write a short bio based on previous information

  Each individuals description should be formatted exactly as follows (do not add any extraneous formatting tokens such as bullet points or bolding):

  * Individual x
  * Name:
  * Gender:
  * Age:
  * Race:
  * Nationality:
  * City:
  * Occupation:
  * Personality:
  * Bio:
  `

  try {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(prompt);
    const response = result.response;
    // console.log("result is: "+ response.text());
    console.log('gemini api called')
    
    const individuals = parseIndividuals(response.text());
    return individuals

  } catch (error) {
    console.error("Error fetching response:", error);
    return("An error occurred while fetching the response.");
  }

}

export { chatDoppel, generateDoppels };