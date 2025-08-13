const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) =>{
try{
    resultDiv.innerHTML = "Searching Data...";
    const reponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await reponse.json();
    let definitions = data[0].meanings[0].definitions[0];

    resultDiv.innerHTML = `
    <h2><strong>Word:</strong> ${data[0].word}</h2>
    <p class = "partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning:</strong> ${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
    <p><strong>Example:</strong> ${definitions.example === undefined ? "Not Found" : definitions.example}</p>
    <p><strong>Antonyms:</strong></p>
    `;

    // Fetching Antonyms
    if (definitions.antonyms.length === 0) {
        resultDiv.innerHTML += `<span>Not Found</span>`;
    } 
    else {
         for(let i=0; i<definitions.antonyms.length; i++){
         resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`; 
        }
    }

  // Fetching Synonyms
    resultDiv.innerHTML += `<p><strong>Synonyms:</strong></p>`;
    if (definitions.synonyms.length === 0) {
        resultDiv.innerHTML += `<span>Not Found</span>`;
    }
    else {
        for(let i=0; i<definitions.synonyms.length; i++){
            resultDiv.innerHTML += `<li>${definitions.synonyms[i]}</li>`;
        }
    }
   
    // Adding Read More Button
    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank"> Read More</a></div>`;
    console.log(data);
 }
catch(error){
    resultDiv.innerHTML = `<p>Sorry, the word could not be found </p>`;
    }
}

//Synonms
