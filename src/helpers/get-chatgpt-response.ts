/*import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);*/

import { Configuration } from "openai";
import { ResDetailPokemon } from "~/interfaces/res-detail-pokemon";

export const getChatGPTResponse = async (id: string):Promise<string> => {
    /*const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "user",
                "content": `Escribe datos interesantes sobre el pokemon pikachu ${pokemonName}`
            }
        ],
        temperature: 1,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    console.log(response);
    

    return 'Temporal';*/
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon-species';
    const resp = await fetch(`${baseUrl}/${id}`);
    const data = (await resp.json()) as ResDetailPokemon;
    const descripInSpanish = data.flavor_text_entries.filter(
        (item) => item.language.name === 'es'
    );
    return descripInSpanish.map((item) => item.flavor_text).join(' ');
}

