import { useMyContext } from "../../../contexts/StateHolder";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getBanner } from "../../../scripts/dataHandlers";
import { createToken } from "../../../scripts/utils";

const Banner = (props) => {

    // Destructure props.settings
    const { id, groupItemId, routes, slickSettings } = props.settings;

    // Destructure props.styles
    const { styles } = props.styles;

    // Bring stateholders from context
    const { bannerItems, setBannerItems, key, language, organizationId, setChosenItem, setChosenCategory, user } = useMyContext();

    const history = useHistory();

    useEffect(() => {
        async function getData() {
            try {
                // Create token for promo items
                const token = createToken(organizationId, groupItemId, key);

                // Call getItems datahandler to get list of items from categories
                const response = await getBanner(organizationId, groupItemId, token, language, user);

                // Set allItems as newAllItems
                let newBannerItems = { ...bannerItems };

                // Add fetched itemList to newAllItems key value (component id = key)
                newBannerItems[id] = response;

                console.log(newBannerItems);

                // Set newItems to allItems context stateholder
                setBannerItems(newBannerItems);

            } catch (err) {
                console.log(err);
            }
        }

        if (organizationId && groupItemId && key && language && !bannerItems[id]) {
            getData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    const clickItem = (item) => {
        // Set chosenItem
        setChosenItem(item);

        // When item is clicked, set chosen category
        setChosenCategory({ id: item.groupItemIds, title: item.groups });

        /* If asset has set pageUrl, redirect to that location.
        Otherwise if asset isSerie, redirect to serie route and if not, redirect to movie route */
        if (item.pageUrl !== "") {
            window.location.href = item.pageUrl;
        } else if (item.isSerie) {
            history.push(`/${routes.serieRoute}/${item.serie.id}`);
        } else if (!item.isSerie) {
            history.push(`/${routes.videoRoute}/${item.id}`);
        } else {
            // Do nothing
        }
    };

    const renderBanner = () => {
        // Map through every category and render titles + content under it
        return bannerItems[id].map((item) => {
            return (
                <img
                    className="bannerItem"
                    key={item.id}
                    onClick={() => clickItem(item)}
                    src={item.bannerImageSmall}
                    alt=""
                    style={styles?.bannerItem}
                />
            );
        });
    };

    // Copy slick settings
    let settings = { ...slickSettings };

    // If there's less than 3 items in category, set slick infinite to false to prevent duplicates (slick bug)
    if (bannerItems[id] && bannerItems[id].length < 3) {
        settings.infinite = false;
    }

    if (bannerItems[id]) {
        return (
            <div className="bannerContainer" style={styles?.bannerContainer}>
                <Slider {...settings}>
                    {bannerItems[id] ? renderBanner() : null}
                </Slider>
            </div>
        );
    } else {
        return (
            null
        )
    }

}

export default Banner;