import { Episode } from "../interfaces/Episode";

type CharacterEpisodesProps = {
    episodes: Episode[];
    title: string;
};

const CharacterEpisodes: React.FC<CharacterEpisodesProps> = ({
    episodes,
    title,
}) => {
    return (
        <div className="bg-blue-300 bg-opacity-10 rounded-lg p-4 m-2 w-1/3">
            <h2 className="text-center text-2xl mb-2">{title}</h2>
            {episodes.length === 0 ? (
                <p className="text-center">No episodes found</p>
            ) : (
                <ul className="list-disc list-inside">
                    {episodes.map((episode, k) => (
                        <li key={k} className="p-1 text-sm">
                            {episode.episode} - {episode.name} - {episode.air_date}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CharacterEpisodes;
