document.getElementById("searchButton").addEventListener("click", function () {
    const word = document.getElementById("wordInput").value;
    if (word) {
        fetchDefinition(word);
    } else {
        alert("Please enter a word to search.");
    }
});

async function fetchDefinition(word) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";
    
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            throw new Error("Word not found.");
        }

        const data = await response.json();
        displayDefinition(data);
    } catch (error) {
        resultDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayDefinition(data) {
    const wordInfo = data[0];
    let html = `<h2>${wordInfo.word}</h2>`;

    if (wordInfo.meanings && wordInfo.meanings.length > 0) {
        wordInfo.meanings.forEach((meaning) => {
            html += `<h3>${meaning.partOfSpeech}</h3>`;
            meaning.definitions.forEach((definition, index) => {
                html += `<p><strong>${index + 1}.</strong> ${definition.definition}</p>`;
                if (definition.example) {
                    html += `<p><em>Example: ${definition.example}</em></p>`;
                }
            });
        });
    } else {
        html += "<p>No definitions found.</p>";
    }

    document.getElementById("result").innerHTML = html;
}
