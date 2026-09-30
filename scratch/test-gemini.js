const geminiKey = Buffer.from("QVEuQWI4Uk42TFNMWUlhTGdCSVZHemk4UU0wTEppblVTb0dQSzFDeE84cHd5bTlVVTVJU", 'base64').toString('utf-8');
const promptText = "Tu es un assistant virtuel IA commercial expert.";

async function testQuery(userText) {
  const activeModels = ['gemini-flash-lite-latest', 'gemini-3.5-flash-lite'];
  for (const mModel of activeModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${mModel}:generateContent?key=${geminiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: promptText + "\nIMPORTANT: Always reply in the exact language used by the client (Moroccan Darija, French, English, Arabic, Spanish, etc.)." }]
          },
          contents: [{ role: 'user', parts: [{ text: userText }] }]
        })
      });
      const data = await response.json();
      console.log(`Model ${mModel} status:`, response.status);
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.log(`SUCCESS for "${userText}":`, data.candidates[0].content.parts[0].text);
        return;
      } else {
        console.log(`Error for ${mModel}:`, JSON.stringify(data));
      }
    } catch (e) {
      console.error(e);
    }
  }
}

async function run() {
  await testQuery("nta cv");
  await testQuery("dwi b darija");
  await testQuery("ch7al l'prix dyal lbot");
}

run();
