import React, { useEffect, useState, useRef, useContext } from "react";
import "./filters.css";
import axios from "axios";
import { baseURL } from "../utils/constant.js";
import { FilterContext } from "../context/FilterContext.js";
import { PriceContext } from "../context/PriceContext.js";
import SliderPrice from "../sliders/sliderPrice.js";
import SliderPower from "../sliders/sliderPower.js";
import SliderYear from "../sliders/sliderYear.js";
import { PowerContext } from "../context/PowerContext.js";
import { YearContext } from "../context/YearContext.js";

import { FaFilter } from "react-icons/fa";


const Filters = () => {
    const [selected, setSelected] = useState(""); //which div we have selected
    const [make, setMake] = useState([]); //save the makes when loading
    const [model, setModel] = useState([]);
    const [options, setOptions] = useState([]);
    const [data, setData] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);
    const filterRefs = useRef({});
    const { selectedFilters, setSelectedFilters } = useContext(FilterContext);
    const { priceValues, setPriceValues } = useContext(PriceContext);
    const { powerValues, setPowerValues } = useContext(PowerContext);
    const { yearValues, setYearValues } = useContext(YearContext);

    const colors = ["White", "Black", "Silver", "Gray", "Blue", "Red", "Dark Blue", "Dark Grey", "Dark Red","Green",];
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

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get(`${baseURL}/get/models`);
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
            console.log(selectedFilters);
        }
    }, [selected, selectedFilters.Make, data]);

    useEffect(() => {
        setOptions([]);
    }, [selected]);

    useEffect(() => {}, [selectedFilters]);

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
        setSelected(filter);
        if (filter === "Price" || filter === "Power" || filter === "Year") {
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
                return model.map((option, index) => (
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
            case "Power":
            case "Year":
            case "Price":
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
                ].map((filter) =>
                    selectedFilters[filter] ? (
                        <div
                            key={filter}
                            className="filter-tag"
                            ref={(el) => (filterRefs.current[filter] = el)}
                        >
                            {filter}: {selectedFilters[filter]}{" "}
                            <button onClick={() => handleRemoveFilter(filter)}>
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

            {menuVisible && (
                <div className="filters-menu-container" ref={menuRef}>
                    {selected !== "Price" &&
                        selected !== "Power" &&
                        selected !== "Year" && (
                            <div className="header">
                                <h4>Choose your {selected}</h4>
                            </div>
                        )}
                    <div className="options-container">{renderOptions()}</div>
                </div>
            )}
            {selected === "Price" && (
                <SliderPrice values={priceValues} setValues={setPriceValues} />
            )}
            {selected === "Power" && (
                <SliderPower values={powerValues} setValues={setPowerValues}/>
                )}
            {selected === "Year" && (
                <SliderYear values={yearValues} setValues={setYearValues}/>
                )}
        </>
    );
};

export default Filters;