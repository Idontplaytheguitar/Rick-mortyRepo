export interface Character {
    gender: string;
    origin: {
        name: string;
    };
    location: {
        name: string;
    };
    type: string;
    id: number;
    name: string;
    status: string;
    species: string;
    image?: string;
    episode: string[];
}
