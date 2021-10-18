import { useMyContext } from "../../../contexts/StateHolder";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getPromo } from "../../../scripts/dataHandlers";
import { createToken } from "../../../scripts/utils";

const Promo = (props) => {
    // Destructure props.settings
    const { id, groupItemId, routes, slickSettings, assetProperty } = props.settings;

    // Destructure props.styles
    const { styles } = props.styles;

    // Bring stateholders from context
    const { promoItems, setPromoItems, key, language, organizationId, setChosenItem, setChosenCategory, user } = useMyContext();

    const history = useHistory();

    useEffect(() => {
        async function getData() {
            try {
                // Create token for promo items
                const token = createToken(organizationId, groupItemId, key);

                // Call getItems datahandler to get list of items from categories
                const response = await getPromo(organizationId, groupItemId, token, language, assetProperty, user);

                // Set allItems as newAllItems
                let newAllItems = { ...promoItems };

                // Add fetched itemList to newAllItems key value (component id = key)
                newAllItems[id] = response;

                // Set newItems to allItems context stateholder
                setPromoItems(newAllItems);

            } catch (err) {
                console.log(err);
            }
        }
        if (organizationId && groupItemId && key && language && !promoItems[id]) {
            getData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    const clickItem = (item) => {
        // Set chosenItem
        setChosenItem(item);

        // When item is clicked, set chosen category
        setChosenCategory({ id: item.groupItemIds, title: item.groups });

        // Switch to details screen if video, seriesDetails if serie
        item.isSerie ? history.push(`/${routes.serieRoute}/${item.id}`) : history.push(`/${routes.videoRoute}/${item.id}`);
    };

    const renderPromo = () => {
        // Map through every category and render titles + content under it
        return promoItems[id].map((item) => {
            return (
                <div
                    className={"promoItem"}
                    key={item.id}
                    onClick={() => clickItem(item)}
                    style={styles?.promoGridItem}
                >
                    <img
                        className="promoItemImg"
                        src={item.thumbnailSmall}
                        alt=""
                    />
                </div>
            );
        });
    };

    // Copy slick settings
    let settings = { ...slickSettings };

    // If there's less than 3 items in category, set slick infinite to false to prevent duplicates (slick bug)
    if (promoItems[id] && promoItems[id].length < 3) {
        settings.infinite = false;
    }

    if (promoItems[id]) {
        return (
            <div className="promoContainer" style={styles?.promoContainer}>
                <Slider {...settings}>
                    {promoItems[id] ? renderPromo() : null}
                </Slider>
            </div>
        );
    } else {
        return (
            null
        )
    }

}

export default Promo;