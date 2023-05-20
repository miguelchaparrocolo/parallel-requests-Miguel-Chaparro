import { useEffect, useState } from 'react';
  const apiurl = 'https://rickandmortyapi.com/api/episode'



async function getEpisodes() {
  const response = await fetch(apiurl);
    const data = await response.json();
      return data.results;
}

async function getCharacters(url) {
  const response = await fetch(url);
    const data = await response.json();
      return data;
}

async function getInfo() {
  const episodes = await getEpisodes();
    const characterEpisode = episodes.reduce((datai, i) => {
      return [...datai, ...i.characters.slice(0, 10)];
    },[]);//no comprendo del todo como afectan []

  const promiseCharacter = characterEpisode.map((url) => {
    return getCharacters(url);
  });

  const result = await Promise.all(promiseCharacter);

  const data = episodes.map((episode) => {
    return {
      title: `${episode.name} at  ${episode.episode}`,
      dateToAir: episode.air_date,
      characters: episode.characters.slice(0, 10).map((url) => {
        return result.find((i) => i.url === url);
      }),
    };
  });
    return data;
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getInfo().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <h1>Rick & Morty Directory</h1>
      <ul>
        {data.map((episode) => (
          <li key={episode.id}>
            <h2>{episode.title}</h2>
            <h3>Emission: {episode.dateToAir}</h3>
            <h3>Characters:</h3>
            <ul>
              {episode.characters.map((character) => (
                <li key={character.id}>
                  {character.name} - {character.species}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
