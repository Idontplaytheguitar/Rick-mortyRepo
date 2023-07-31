import React, { useState, useEffect, useRef, useCallback } from "react";
import { Character } from "../interfaces/Character";
import Card from "./Card";
import { rickAndMorty } from "../utils/Rick&Morty";
import FiltersComponent from "./FiltersComponent";

interface CharacterSelectionProps {
    selectCharacter: (character: Character | null) => void; // updated this line
    title: string;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({
    selectCharacter,
    title,
}) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [selectedCharacter, setSelectedCharacter] =
        useState<Character | null>(null);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState();
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const observer = useRef<IntersectionObserver>();

    const rickAndMortyService = new rickAndMorty();

    
    const lastCharacterElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, filters, hasMore]
    );
    useEffect(() => {
        setLoading(true);
        setCharacters([]); // Reset the characters when the filters change
        setPage(1); // Go back to the first page when the filters change
    }, [filters]);

    useEffect(() => {
        setLoading(true);
        (async () => {
            const data = await rickAndMortyService.getCharacter(page, filters);
            if (data) {
                setCharacters((prevCharacters) => [
                    ...prevCharacters,
                    ...data.results,
                ]);
                setHasMore(data.info.pages >= page + 1);
            }
            setLoading(false);
        })();
    }, [page, filters]);
    

    const handleCharacterSelect = (character: Character) => {
        if (selectedCharacter && selectedCharacter.id === character.id) {
            setSelectedCharacter(null);
            selectCharacter(null);
        } else {
            setSelectedCharacter(character);
            selectCharacter(character);
        }
    };

    return (
        <div className="h-half overflow-auto overflow-x-visible p-10">
            <h3 className="text-center text-3xl mb-4 sticky top-0 z-40 bg-green-600 bg-opacity-70 w-1/2 mx-auto rounded-2xl">{title}</h3>

            <FiltersComponent changeFilters={setFilters}/>

            <div className="grid grid-cols-2 gap-4 ">
                {characters.map((character, index) => {
                    if (characters.length === index + 1) {
                        return (
                            <Card
                                selected={selectedCharacter === character}
                                character={character}
                                key={index}
                                classname={`${
                                    selectedCharacter && character === selectedCharacter
                                        ? "bg-green-400 bg-opacity-50"
                                        : "bg-blue-400"
                                }`}
                                onClick={() => handleCharacterSelect(character)}
                                ref={lastCharacterElementRef}
                            />
                        );
                    } else {
                        return (
                            <Card
                                selected={selectedCharacter === character}
                                character={character}
                                key={index}
                                classname={`${
                                    selectedCharacter && character === selectedCharacter
                                        ? "bg-green-400"
                                        : "bg-blue-400"
                                }`}
                                onClick={() => handleCharacterSelect(character)}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default CharacterSelection;
