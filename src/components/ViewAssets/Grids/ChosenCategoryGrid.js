import { useMyContext } from "../../../contexts/StateHolder";
import RenderItem from "../RenderItems/RenderItem";
import CategoryTitle from "../CategoryTitles/CategoryTitle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAssets } from "../../../scripts/dataHandlers";
import { createToken } from "../../../scripts/utils";

const RenderChosenCategoryGrid = (props) => {

    // Destructure props.settings
    const { routes, assetProperty } = props.settings;

    // Destructure props.styles
    const { styles } = props.styles;

    // Bring stateholders from context
    const { chosenCategory, allCategories, key, language, organizationId, user } = useMyContext();

    const [items, setItems] = useState([]);

    const [categoryName, setCategoryName] = useState([]);

    const { asset } = useParams();

    useEffect(() => {
        async function getData() {
            try {
                // Call createToken function to create new token from given data
                const token = createToken(organizationId, asset, key);

                // Call getAssets datahandler to get list of all items from category
                const itemList = await getAssets(organizationId, asset, token, language, assetProperty, user);

                // Find categoryname by asset id number from itemList and set it in stateholder of categoryName
                setCategoryName(itemList[0].folders.find(category => Number(category.id) === Number(asset)).name);

                // Set items in stateHolder
                setItems(itemList);

            } catch (err) {
                console.log(err);
            }
        }
        if (allCategories?.length > 0) {
            getData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allCategories, language, chosenCategory, asset]);

    const renderChosenCategoryGrid = () => {
        // Map through category of items, showing clickable image of each item
        return items.map((item, i) => {
            return (
                <RenderItem key={i} styles={styles} item={item} routes={routes} />
            );
        });
    };

    return (

        <div className="chosenCategoryGrid">
            <CategoryTitle
                title={chosenCategory.title ? chosenCategory.title : categoryName}
                styles={styles}
            />

            <div
                className="categoryGridContainer"
                style={styles?.categoryGridContainer}
            >
                {items ? renderChosenCategoryGrid() : null}
            </div>
        </div>
    );
}

export default RenderChosenCategoryGrid;