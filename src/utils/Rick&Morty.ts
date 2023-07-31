import { Character } from "../interfaces/Character";
import { Episode } from "../interfaces/Episode";

export class rickAndMorty {
    url = "https://rickandmortyapi.com/api/";

    private pageQueryLogic(page?: number) {
        return `${page ? `page=${page}` : ""}`;
    }

    async getCharacter(
        page?: number,
        filters?: unknown
    ): Promise<responseStructure> {
        try {
            const response = await fetch(
                `${this.url}character/${
                    page || filters ? "?" : ""
                }${this.pageQueryLogic(page)}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data as responseStructure;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getEpisodeByUrl(url: string): Promise<Episode> {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data as Episode;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

interface responseStructure {
    info: {
        count: number;
        pages: number;
    };
    results: Character[];
}
