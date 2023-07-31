import "../styles/index.css";
import CharacterSelection from "./CharacterSelection";
import { useEffect, useState } from "react";
import { Character } from "../interfaces/Character";
import CharacterEpisodes from "./CharacterEpisodes";
import { rickAndMorty } from "../utils/Rick&Morty";
import { Episode } from "../interfaces/Episode";
import Loader from './Loader'; // import the Loader component

function App() {
    const [character1, setCharacter1] = useState<Character | null>(null);
    const [character2, setCharacter2] = useState<Character | null>(null);
    const [showEpisodes, setShowEpisodes] = useState(false);
    const [character1Episodes, setCharacter1Episodes] = useState<Episode[]>([]);
    const [character2Episodes, setCharacter2Episodes] = useState<Episode[]>([]);
    const [bothCharactersEpisodes, setBothCharactersEpisodes] = useState<
        Episode[]
    >([]);
    const [loading,setLoading] = useState(false)

    const handleSearch = async () => {
        if (character1 && character2) {
            setLoading(true)
            try {
                const rickMortyService = new rickAndMorty();

                const character1Episodes = await Promise.all(
                    character1.episode.map((url) =>
                        rickMortyService.getEpisodeByUrl(url)
                    )
                );
                const character2Episodes = await Promise.all(
                    character2.episode.map((url) =>
                        rickMortyService.getEpisodeByUrl(url)
                    )
                );

                // Filter episodes to find common ones
                const commonEpisodes = character1Episodes.filter((ep1) =>
                    character2Episodes.some((ep2) => ep2.id === ep1.id)
                );

                setCharacter1Episodes(character1Episodes);
                setCharacter2Episodes(character2Episodes);
                setBothCharactersEpisodes(commonEpisodes);

                setShowEpisodes(true);
                setTimeout(() =>{
                    setLoading(false)
                },300)
            } catch (error) {
                console.error("Error fetching episodes:", error);
                setLoading(false)
            }
        }
    };

    useEffect(() => {
        if(character1 && character2){
            setShowEpisodes(false)
        } else{
            setLoading(true)
            setShowEpisodes(false)
            setTimeout(() =>{
                setLoading(false)
            },200)
        }
    },[character1,character2])

    return (
        <div className="flex flex-col bg-rick&morty min-h-screen  bg-blend-saturation bg-slate-700 bg-opacity-90 p-10">
            <div className="flex flex-row h-[500px]">
                <CharacterSelection
                    selectCharacter={setCharacter1}
                    title="Character 1"
                />
                <CharacterSelection
                    selectCharacter={setCharacter2}
                    title="Character 2"
                />
            </div>
            <button
                className={`transform transition-all m-2 p-5 text-4xl w-1/2 mx-auto my-5  bg-blue-500 text-white disabled:cursor-default hover:disabled:bg-blue-500 hover:bg-green-400 rounded font-GetSchwifty ${
                    character1 && character2
                        ? ""
                        : "opacity-50 cursor-not-allowed"
                }`}
                onClick={handleSearch}
                disabled={!character1 || !character2}
            >
                SHOW ME WHAT YOU GOT
            </button>
            {loading ? <Loader/> : showEpisodes && (
                <div className="flex flex-row justify-between transform transition-all">
                    <CharacterEpisodes
                        episodes={character1Episodes}
                        title={`${character1?.name} 1 Episodes`}
                    />
                    <CharacterEpisodes
                        episodes={bothCharactersEpisodes}
                        title="Both Characters Episodes"
                    />
                    <CharacterEpisodes
                        episodes={character2Episodes}
                        title={`${character2?.name} 1 Episodes`}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
