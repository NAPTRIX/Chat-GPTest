 const API_KEY = window.prompt("    Enter your API key  ");
 if (API_KEY){
async function generateText() {
  API_KEY
  const model = "text-davinci-002";
  const endpoint = `https://api.openai.com/v1/engines/${model}/jobs`;

  const prompt = document.getElementById("prompt").value;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.5,
    }),
  });

  const json = await response.json();

  if (!json.choices || !json.choices.length) {
    // Handle the error: no text generated
    console.error(json);
    document.getElementById("generated-text").innerHTML = "No text generated";
    return;
  }

  const generatedText = json.choices[0].text;
  document.getElementById("generated-text").innerHTML = generatedText;
}

document.getElementById("generate-button").addEventListener("click", generateText);
}
else {
document.getElementById("prompt").innerHTML = "the API key field can't be empty."
  document.getElementById("prompt").disabled = true;
}
