

let API_KEY;
if (localStorage.getItem("API_KEY")){
   API_KEY = localStorage.getItem("API_KEY")
}
else{
  API_KEY = window.prompt(`     Enter your API key:`);}
 localStorage.setItem("API_KEY", API_KEY)
 if (API_KEY){
   document.getElementById("clear").addEventListener("click", function (){
     localStorage.clear()
     API_KEY = ""
     document.getElementById("generated-text").innerHTML= `<li> You have signed out </li>`
     window.location.reload()
   })
async function generateText() {
  const model = "text-davinci-002";
  const endpoint = `https://cors-anywhere.herokuapp.com/https://api.openai.com/v1/engines/${model}/jobs`;

  const prompt = document.getElementById("prompt").value;
  document.getElementById("prompt").value = ""

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
    document.getElementById("generated-text").innerHTML += "<li>You: "+ prompt+"</li><li>" + "ChatGPT: No text generated: "+ json.error.message+"</li>";
    return;
  }

  const generatedText = json.choices[0].text;
  document.getElementById("generated-text").innerHTML += "<li>" + "You: " + prompt+  "</li>" + "<li> ChatGPT: " +generatedText+"</li>";
}

document.getElementById("generate-button").addEventListener("click", generateText);
}
else {
document.getElementById("prompt").innerHTML = "the API key field can't be empty."
  document.getElementById("prompt").disabled = true;
  document.getElementById("generated-text").innerHTML = 'Get your API key from: <a href="https://platform.openai.com/account/api-keys"> https://platform.openai.com/account/api-keys </a> '
}
