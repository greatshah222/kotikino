import { useMyContext } from "../../../contexts/StateHolder";
import { useHistory } from "react-router-dom";
import { getImageByKey } from "../../../scripts/getImageByKey";
import ItemTitle from "./ItemTitle";

// Renders props item
const RenderItem = (props) => {

    const history = useHistory();

    // Bring stateholders from context
    const { setChosenCategory, setChosenItem } = useMyContext();

    const clickItem = (item) => {
        // Set chosenItem
        setChosenItem(item);

        // When item is clicked, set chosen category
        setChosenCategory({ id: item.groupItemIds, title: item.groups });

        // Switch to details screen if movie, seriesDetails if serie
        item.isSerie ? history.push(`/${props.routes.serieRoute}/${item.serie.id}`) : history.push(`/${props.routes.videoRoute}/${item.id}`);
    };

    // TODO: Pick image format based on config-file settings

    const pickImage = (item) => {
        if (item.serie) {
            return item.serie.coverImageSmall;
        } else {
            return item.coverImageSmall ? item.coverImageSmall : item.thumbnailSmall;
        }
    };

    return (
        <div
            className={"categoryItem"}
            key={props.item.id}
            onClick={() => clickItem(props.item)}
            style={props.styles?.categoryItem}
        >
            <img
                effect="blur"
                className="categoryItemImg"
                src={pickImage(props.item) ? pickImage(props.item) : getImageByKey("comingSoon") }
                alt=""
                style={props.styles?.categoryTitleContainer}
            />
            <ItemTitle
            item={props.item}
            styles={props?.styles}
            />
        </div>
    );
}

export default RenderItem;
