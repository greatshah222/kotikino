import { useMyContext } from "../../../contexts/StateHolder";
import RenderItem from "../RenderItems/RenderItem";
import CategoryTitle from "../CategoryTitles/CategoryTitle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { getAssets, getSubCategories, getRootSubCategories } from "../../../scripts/dataHandlers";
import { createToken, createGroupItemId, modifySlickSettings } from "../../../scripts/utils";

/*
Fetch: getAssets with props.groupItemId
Renders: props categories with title and content in slick slider
*/
const RenderCategoriesWithTitles = (props) => {

    // Destructure props.settings
    const { id, mode, groupItemId, routes, slickSettings, assetProperty } = props.settings;

    // Destructure props.styles
    const { styles } = props.styles;

    const [groupItemIdString, setGroupItemIdString] = useState("");

    const [stateCategories, setStateCategories] = useState([]);

    const [allCategoryItems, setAllCategoryItems] = useState([]);

    // Bring stateholders from context
    const { allCategories, organizationId, key, language, user } = useMyContext(); // + allCategoryItems, setAllCategoryItems when using context

    // UseEffect that will check mode and context data by id, if component has already fetched items once
    useEffect(() => {
        const getDataFromAPI = async () => {
            try {

                /*
                mode 1: show listed categories in config or from request
                mode 2: read orgId from request or from config file, and list all top level categories of that organisation
                mode 3: read root categoryId from request or config file
                */

                let idString = "";

                if (mode === "mode_1") {
                    // idString is groupItemId imported in props (config settings)
                    idString = groupItemId;

                    const token = createToken(organizationId, groupItemId, key);

                    const catList = await getSubCategories(organizationId, token, groupItemId, language, user);
                    
                    // Set fetched categorylist in stateCategories
                    setStateCategories(catList);
                } else if (mode === "mode_2") {
                    // Create idString from all categories (category[0].id,category[1].id...)
                    idString = createGroupItemId(allCategories);

                    setStateCategories(allCategories);
                } else if (mode === "mode_3") {
                    // Get root category id from config and fetch list of subcategories
                    const subCatList = await getRootSubCategories(organizationId, key, language, groupItemId, user);

                    // Create groupItemId from list of subcategories
                    idString = createGroupItemId(subCatList);

                    // Set subcategory list in stateCategories
                    setStateCategories(subCatList);
                }

                // Set idString in stateholder
                setGroupItemIdString(idString);

                // Call createToken function to create new token from given data
                const token = createToken(organizationId, idString, key);

                // Call getAssets datahandler to get list of all items from all categories
                const itemList = await getAssets(organizationId, idString, token, language, assetProperty, user);

                // Set allItems as newAllItems
                let newAllCategoryItems = { ...allCategoryItems };

                // Add fetched itemList to newAllItems key value (component id = key)
                newAllCategoryItems[id] = itemList;

                console.log(newAllCategoryItems);
                // Set newItems to allItems context stateholder
                setAllCategoryItems(newAllCategoryItems);
            } catch (err) {
                console.log(err);
            }
        }
/*
        const getDataFromContext = async () => {
            try {
                // If there's data available in context, check mode and set groupItemIdString accordingly.
                if (mode === "mode_1") {
                    // Set imported groupItemId from config as groupItemIdString
                    setGroupItemIdString(groupItemId);

                    const token = createToken(organizationId, groupItemId, key);
                    
                    const catList = await getSubCategories(organizationId, token, groupItemId, language);
                    
                    // Set fetched categorylist in stateCategories
                    setStateCategories(catList);
                } else if (mode === "mode_2") {
                    // Combine string of id:s from allCategories and set it as groupItemIdString
                    setGroupItemIdString(createGroupItemId(allCategories));
                    setStateCategories(allCategories);
                } else if (mode === "mode_3") {
                    const subCatList = await getSubCategories(organizationId, key, language, groupItemId);

                    setGroupItemIdString(createGroupItemId(subCatList));

                    setStateCategories(subCatList);
                }
            } catch (err) {
                console.log(err);
            }
        };
        */

        /////// DECIDE FUNCTION TO CALL

        if (allCategories?.length > 0 && organizationId && groupItemId && key && language) { //  && !allCategoryItems[id]
            // If there's no held data in context by component id, get data from api
            getDataFromAPI();
           
        } /* else if (allCategoryItems[id]?.length > 0) {
            // If there's data available by id in context, get data from context
            getDataFromContext();
        }*/

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allCategories]);

    const renderCategories = () => {

        // Filter all categories with props.categories
        let categories = stateCategories.filter(category => groupItemIdString.includes(String(category.id)));

        return categories.map((item) => {

            // Filter all items with categoryId, leaving only item from requested category
            const categoryItems = allCategoryItems[id].filter(catItem => catItem.groupItemIds.includes(String(item.id)));

            // TODO: SET WINDOW WIDTH IN STATE AND PASS IT IN MODIFYSLICKSETTINGS, CHANGED ON RESIZE
            // https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

            // Copy and modify slick settings to match current width and category length
            let settings = modifySlickSettings({ ...slickSettings }, categoryItems.length);

            return (
                <div
                    className="categoriesContainer"
                    key={`${id} ${item.id}`}
                >
                    <CategoryTitle
                        id={item.id}
                        title={item.title}
                        routes={routes}
                        styles={styles}
                    />

                    <div
                        className={"categoryContent"}
                        style={styles?.categoryContent}
                    >
                        <Slider {...settings}>
                            {categoryItems.map((item, i) =>
                                <RenderItem key={`${id} ${i}`} styles={styles} item={item} routes={routes} />
                            )}
                        </Slider>
                    </div>
                </div>
            );
        });
    };
    return (
        allCategoryItems[id]?.length > 0 && stateCategories && groupItemIdString ? renderCategories() : null
    );
}

export default RenderCategoriesWithTitles;