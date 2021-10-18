import { useMyContext } from "../../contexts/StateHolder";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RenderItem from "../ViewAssets/RenderItems/RenderItem";
import { getAssets } from "../../scripts/dataHandlers";
import { createToken, createGroupItemId } from "../../scripts/utils";

const Search = (props) => {

    // Bring stateholders from context
    const { allCategories, key, language, organizationId } = useMyContext();

    // Holders for controlled inputs
    const [searchFieldInput, setSearchFieldInput] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("all");

    const [checkAll, setCheckAll] = useState(true);
    const [checkMovies, setCheckMovies] = useState(false);
    const [checkSeries, setCheckSeries] = useState(false);

    const [results, setResults] = useState([]);

    const [searchDone, setSearchDone] = useState(false);

    const [chosenResultFilter, setChosenResultFilter] = useState("newFirst");

    // Setup translate function
    const { t } = useTranslation();

    const doSearch = (e) => {
        e.preventDefault();

        async function getData() {
            try {
                let id = "";

                // THIS WILL BE REPLACED WITH API REQUEST PARAMETERS (currently client-side)
                if (selectedCategory === "all") {
                    // Create groupItemId from all categories
                    id = createGroupItemId(allCategories);
                } else {
                    // GroupItemId is just id of selected category
                    id = selectedCategory
                }

                // Call createToken function to create new token from given data
                const token = createToken(organizationId, id, key);

                // Call getAssets datahandler to get list of all items from category
                const itemList = await getAssets(organizationId, id, token, language);

                // Set items in stateHolder
                setResults([...itemList]);

                // Set searchDone to true
                setSearchDone(true);
            } catch (err) {
                console.log(err);
            }
        }
        if (allCategories?.length > 0) {
            getData();
        }
    };

    const renderResults = () => {
        let renderArray = [];

        // THIS WILL BE REMOVED WHEN API DEALS WITH FILTERING
        // Check checkbox statuses and filter requested results
        if (checkMovies) {
            renderArray = results.filter(item => item.isSerie === false)
        } else if (checkSeries) {
            renderArray = results.filter(item => item.isSerie === true)
        } else {
            renderArray = [...results];
        }

        // If searchFieldInput isnt empty (there's search parameter)
        if (searchFieldInput !== "") {
          
            // Split string into searchArray word by word
            const searchArray = searchFieldInput.split(" ");

            // Filter renderArray by asset names that match any word in searchArray
            renderArray = renderArray.filter((asset) => {
                return searchArray.some(word => asset.name.match(new RegExp(word, "gi")) )
            })
        };

        // Check for result filter, if it's by date or alphabetically and sort renderArray
        if (chosenResultFilter === "newFirst") {
            renderArray.sort((a, b) => b.releaseYear - a.releaseYear);
        } else {
            renderArray.sort((a, b) => {
                const aName = a.isSerie ? a.programName : a.name;
                const bName = b.isSerie ? b.programName : b.name;
                return aName.localeCompare(bName)
            })
        }

        return (
            <div>
                <div className="row" style={searchDone ? { display: "flex" } : { display: "none" }}>
                    <div className="resultsAmount">
                        {`${renderArray.length} ${t("videos")}`}
                    </div>
                    <div
                        className={chosenResultFilter === "newFirst" ? "searchResultBTN active" : "searchResultBTN"}
                        onClick={() => setChosenResultFilter("newFirst")}
                    >
                        {t("Newest first")}
                    </div>
                    <div
                        className={chosenResultFilter === "alphabet" ? "searchResultBTN active" : "searchResultBTN"}
                        onClick={() => setChosenResultFilter("alphabet")}
                    >
                        {t("A-Z")}
                    </div>
                </div>
                <div className="resultsGrid">
                    {renderArray.map((item, i) => (
                        <RenderItem key={i} styles={props.styles} item={item} routes={props.routes} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="searchContainer">

            <form id="searchForm" onSubmit={(e) => doSearch(e)}>

                <div className="searchTitle">{t("Search and browse the content")}</div>

                <div className="searchRow">

                    <div className="searchColumn">

                        <div className="searchLabel">{t("Search by name")}</div>

                        <input className="searchField" type="text" value={searchFieldInput} onChange={(e) => setSearchFieldInput(e.target.value)} />

                    </div>

                    <div className="searchColumn">
                        <div className="searchLabel">{t("Categories")}</div>

                        <select
                            id="searchSelectCategory"
                            className="searchSelectCategory"
                            name="category"
                            selected={selectedCategory}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option
                                value={"all"}
                                key={"selectCategory"}
                            >
                                {t("Select Category")}
                            </option>

                            {allCategories?.map(category => {
                                return <option value={category.id} key={category.id}> {category.title} </option>
                            })}
                        </select>
                    </div>

                    <button type="submit" className="searchButton">{t("Search")}</button>

                </div>

                <label className="searchCheckboxLabel">
                    <input
                        className="searchCheckbox"
                        type="checkbox"
                        checked={checkAll}
                        onChange={() => { setCheckAll(true); setCheckMovies(false); setCheckSeries(false) }}
                    />
                    {t("Show All")}
                </label>

                <label className="searchCheckboxLabel">
                    <input
                        className="searchCheckbox"
                        type="checkbox"
                        checked={checkMovies}
                        onChange={() => { setCheckMovies(true); setCheckAll(false); setCheckSeries(false) }}
                    />
                    {t("Only Movies")}
                </label>

                <label className="searchCheckboxLabel">
                    <input
                        className="searchCheckbox"
                        type="checkbox"
                        checked={checkSeries}
                        onChange={() => { setCheckSeries(true); setCheckAll(false); setCheckMovies(false) }}
                    />
                    {t("Only Series")}
                </label>

            </form>

            {results ? renderResults() : null}

        </div>
    )
}

export default Search;
