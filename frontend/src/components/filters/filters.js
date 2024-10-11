import React, { useEffect, useState, useRef, useContext } from "react";
import "./filters.css";
import axios from "axios";
import { FilterContext } from "../context/FilterContext.js";
import { PriceContext } from "../context/PriceContext.js";
import SliderPrice from "../sliders/sliderPrice.js";
import SliderPower from "../sliders/sliderPower.js";
import SliderYear from "../sliders/sliderYear.js";
import SliderKilometres from "../sliders/sliderKilometres.js";
import { PowerContext } from "../context/PowerContext.js";
import { YearContext } from "../context/YearContext.js";
import { KilometresContext } from "../context/KilometresContext.js";

const Filters = () => {
    const [selected, setSelected] = useState("");
    const [make, setMake] = useState([]);
    const [model, setModel] = useState([]);
    const [options, setOptions] = useState([]);
    const [data, setData] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [message, setMessage] = useState("");
    const menuRef = useRef(null);
    const filterRefs = useRef({});
    const { selectedFilters, setSelectedFilters } = useContext(FilterContext);
    const { priceValues, setPriceValues } = useContext(PriceContext);
    const { powerValues, setPowerValues } = useContext(PowerContext);
    const { yearValues, setYearValues } = useContext(YearContext);
    const { kilometresValues, setKilometresValues } = useContext(KilometresContext);

    const [searchModel, setSearchModel] = useState('');

    const colors = ["White", "Black", "Silver", "Gray", "Blue", "Red", "Dark Blue", "Dark Grey", "Dark Red", "Green",];
    const transmission = ["manual", "automatic"];
    const fuel = ["petrol", "diesel", "electric", "hybrid"];
    const locations = [
        "Sofia",
        "Varna",
        "Plovdiv",
        "Vratsa",
        "Burgas",
        "Dupnica",
        "Stara Zagora",
        "Montana",
        "Ruse",
        "Haskovo",
        "Pleven",
        "Shumen",
        "Sliven",
        "Dobrich",
        "Veliko Tarnovo",
        "Pazardjik",
        "Pernik",
        "Gabrovo",
        "Blagoevgrad",
        "Kazanlak",
        "Razgrad",
        "Kustendil",
        "Silistra",
        "Troqn",
        "Kurdjali",
        "Targovishte",
        "Dimitrovgrad",
        "Vidin",
        "Yambol",
        "Petrich",
        "Karnobat",
        "Provadia",
        "Velingrad",
        "Gorna Orqhovica",
        "Lovech",
    ];
    const publishedBy = ["Private Seller", "Dealer", "Official Distributor"];
    const doorsCount = ["2/3", "4/5"];
    const coupe = ['sedan', 'hatchback', 'combie', 'coupe', 'limousine', 'SUV'];

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get/models`);
                setData(response.data);
                const makes = new Set(
                    response.data
                        .map((car) => car.make)
                        .sort((a, b) => a.localeCompare(b))
                );
                setMake(Array.from(makes));
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };

        fetchModels();
    }, []);

    useEffect(() => {
        if (selected === "Model" && selectedFilters.Make) {
            const filteredModels = data
                .filter((car) => car.make === selectedFilters.Make)
                .map((car) => car.model);
            setModel(filteredModels);
            setOptions(filteredModels);
        }
    }, [selected, selectedFilters.Make, data]);

    useEffect(() => {
        setOptions([]);
    }, [selected]);

    useEffect(() => { }, [selectedFilters]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFilterClick = (filter) => {
        if (filter === "Model" && !selectedFilters.Make) {
            setMessage("Please select a Make first.");
            return;
        }

        setSelected(filter);
        setMessage(""); 

        if (filter === "Price" || filter === "Power" || filter === "Year" || filter === 'Kilometres') {
            setMenuVisible(false);
        } else {
            setMenuVisible(true);
        }
    };

    const handleOptionClick = (option) => {
        setSelectedFilters((prev) => ({ ...prev, [selected]: option }));
        setMenuVisible(false);
    };

    const handleRemoveFilter = (filter) => {
        setSelectedFilters((prev) => {
            const updatedFilters = { ...prev };
            delete updatedFilters[filter];
            return updatedFilters;
        });
        setSelected("");
    };

    const renderOptions = () => {
        switch (selected) {
            case "Make":
                return make.map((option, index) => (
                    <div key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </div>
                ));
            case "Model":
                return model
                    .filter((option) =>
                        option.toLowerCase().includes(searchModel.toLowerCase())
                    )
                    .map((option, index) => (
                        <div key={index} onClick={() => handleOptionClick(option)}>
                            {option}
                        </div>
                    ));
            case "Fuel":
                return fuel.map((option, index) => (
                    <div key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </div>
                ));
            case "Transmission":
                return transmission.map((option, index) => (
                    <div key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </div>
                ));
            case "Location":
                return locations.map((option, index) => (
                    <div key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </div>
                ));
            case "From":
                return publishedBy.map((option, index) => (
                    <div key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </div>
                ));
            case "Color":
                return colors.map((option, index) => (
                    <div key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </div>
                ));
            case "DoorsCount":
                return doorsCount.map((option, index) => (
                    <div key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </div>
                ));
            case "Coupe":
                return coupe.map((option, index) => (
                    <div key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </div>
                ));
            case "Power":
            case "Year":
            case "Price":
            case "Kilometres":
            default:
                return null;
        }
    };

    return (
        <>
            <div className="filters-container">
                {[
                    "Make",
                    "Model",
                    "Fuel",
                    "Transmission",
                    "Price",
                    "Year",
                    "Location",
                    "From",
                    "Color",
                    "DoorsCount",
                    "Power",
                    "Coupe",
                    "Kilometres",
                ].map((filter) =>
                    selectedFilters[filter] ? (
                        <div
                            key={filter}
                            className="filter-tag"
                            ref={(el) => (filterRefs.current[filter] = el)}
                        >
                            {filter}: {selectedFilters[filter]}{" "}
                            <button className="filter-remove-btn" onClick={() => handleRemoveFilter(filter)}>
                                X
                            </button>
                        </div>
                    ) : (
                        <div
                            key={filter}
                            onClick={() => handleFilterClick(filter)}
                            ref={(el) => (filterRefs.current[filter] = el)}
                        >
                            {filter}
                        </div>
                    )
                )}
            </div>

            {message && <div className="warning-message">{message}</div>}

            {menuVisible && (
                <div className="filters-menu-container" ref={menuRef}>
                    {selected !== "Price" &&
                        selected !== "Power" &&
                        selected !== "Year" &&
                        selected !== "Kilometres" && (
                            <div className="header">
                                <h4>Select an option</h4>
                            </div>
                        )}

                    {selected === "Model" && (
                        <div className="search-model-container">
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Search Model"
                                value={searchModel}
                                onChange={(e) => setSearchModel(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="options-container">{renderOptions()}</div>
                </div>
            )}

            {selected === "Price" && (
                <SliderPrice values={priceValues} setValues={setPriceValues} />
            )}
            {selected === "Power" && (
                <SliderPower values={powerValues} setValues={setPowerValues} />
            )}
            {selected === "Year" && (
                <SliderYear values={yearValues} setValues={setYearValues} />
            )}
            {selected === "Kilometres" && (
                <SliderKilometres values={kilometresValues} setValues={setKilometresValues} />
            )}
        </>
    );
};

export default Filters;
