import { forwardRef } from "react";
import { Character } from "../interfaces/Character";

interface CardProps {
    character: Character;
    classname: string;
    onClick: () => void;
    selected: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ character, classname, onClick, selected }, ref) => {
        return (
            <div
                ref={ref}
                onClick={onClick}
                className={`transition-all ease-in-out duration-500 ${
                    selected ? "transform rotate-y-180" : ""
                } delay-[20ms] card w-full flex text-center border-2 rounded-lg h-32 m-2 bg-blue-300 bg-opacity-40 hover:cursor-pointer transform hover:border-2 hover:scale-105 ${
                    selected ? "opacity-90 flex-row-reverse" : ""
                } ${classname}`}
            >
                <img
                    src={character.image}
                    alt="character"
                    className="w-1/2 object-cover"
                />
                <div className="flex flex-col justify-between w-1/2 px-2">
                    <h2 className="text-xl mb-2">{character.name}</h2>
                    <div
                        className={`flex flex-col justify-center text-xs my-auto`}
                    >
                        <div
                            className={`flex justify-evenly ${
                                selected ? "hidden" : "flex"
                            }`}
                        >
                            <div className="flex flex-row">
                                <div
                                    className={`h-3 w-3 ${
                                        character.status === "Alive"
                                            ? "bg-green-300"
                                            : ""
                                    } ${
                                        character.status === "unknown"
                                            ? "bg-yellow-300"
                                            : ""
                                    } ${
                                        character.status === "Dead"
                                            ? "bg-red-400"
                                            : ""
                                    } rounded-2xl my-auto mx-2`}
                                ></div>
                                <p>
                                    {character.status.charAt(0).toUpperCase() +
                                        character.status.slice(1)}
                                </p>
                            </div>
                            <p>{character.species}</p>
                        </div>
                        <div
                            className={`flex flex-row justify-evenly ${
                                selected ? "flex" : "hidden"
                            }`}
                        >
                            <p>{character.gender}</p>
                            <p>{character.origin.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export default Card;
