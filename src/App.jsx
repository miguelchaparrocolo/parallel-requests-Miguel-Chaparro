import { useState, useEffect } from "react";

  const urlapi = 'https://rickandmortyapi.com/api/episode';

const fetchEpisode = async () => {
  const res = await fetch(urlapi);
    return res.json();
}

const fetchCharacter = async (urlapi) => {
  const res = await fetch(urlapi);
    return res.json();
}

const fetchAllCharacters = async (charactersUrl) => {
  const characterUrlSet = new Set();
    charactersUrl.forEach ((urlapi) => {
      characterUrlSet.add(urlapi);
    });

  const promiseCharacters = Array.from(characterUrlSet).map((characterUrl) => {
    const promiseCharacter = fetchCharacter(characterUrl);
      return promiseCharacter;
  })

  const charactersData = await promiseCharacters.all(promiseCharacters);
    return charactersData;
}

const createData = (episodes, characters) => {
  const DataN = episodes.map((episode) => {
    return{
      title: `${episode.name} at ${episode.episode}`,
      dateOnAir: episode.air_date,
      characters: episode.characters.slice(0-10).map((urlapi) => {
        return characters.find((item) => urlapi === item.urlapi);
      })
    }
  });
      return DataN;
};

function App() {
  const [allData, setAllData] = useState ();

  useEffect(() => {
    const fetchI = async () => {
      const episodesData = await fetchEpisode();
      const episodesList = episodesData.result;

      const characterslist = [];
      episodesList.map((episode) => {
        episode.characters.map((characterUrl, i) => {
          if (i <= 9) {
            characterslist.push(characterUrl);
          }
        });
      });

      const charactersData = await fetchAllCharacters(characterslist);

      const data = createData(episodesList, charactersData);
        setAllData(data);
    }
    fetchI();
  }, [])

    return (
      <>
        <h3>Rick and Morty Directory</h3>
        <h4>Episodes:</h4>
        {allData.map((episode, i) => {
          return(
            <div className="episode__title" key={i}>
              <p>{ episode.title }</p>
              <p>Emission: { episode.dateOnAir }</p>
              <p>characters:</p>
                <div className="episode__characters">
                  <ul>
                    {episode.characters.map((character, i) => {
                      return <li key={i}>
                        {`${character.name} - ${character.especies}`}
                      </li>
                    })}
                  </ul>
                </div>
            </div>
          );
        })}
      </>
    );
};

  export default App;
