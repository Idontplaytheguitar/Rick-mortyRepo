import React, { useEffect, useState } from "react";

interface SortAndFilterProps {
    changeFilters: (filters: { status?: string }) => void;
}

const FiltersComponent: React.FC<SortAndFilterProps> = ({ changeFilters }) => {
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        changeFilters({  status: statusFilter });
    }, [statusFilter, changeFilters]);

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row">
                <label>Filter by status: </label>
                <select
                    className="bg-green-400 bg-opacity-20 border-opacity-20"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
        </div>
    );
};

export default FiltersComponent;
