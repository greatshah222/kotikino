import { useMyContext } from "../../../contexts/StateHolder";
import { useHistory } from "react-router-dom";
import { BsTriangleFill } from "react-icons/bs";

// Renders props item
const CategoryTitle = (props) => {

    const history = useHistory();

    // Bring stateholders from context
    const { setChosenCategory } = useMyContext();

    const clickCategory = (categoryObj) => {
        // Set chosen category
        setChosenCategory(categoryObj);

        //let vod = checkVod(routes, location.pathname, allRoutes);

        // Switch to categories view
        history.push(`/${props.routes.categories}/${categoryObj.id}`);
    };

    return (
        <div className="categoryTitleContainer" styles={props.styles?.categoryTitleContainer}>
            <BsTriangleFill className="svg-triangle" />
            <div
                className={props.id ? "categoryTitle titleHover" : "categoryTitle"}
                onClick={() => props.id ? clickCategory({ id: props.id, title: props.title }) : () => false}
                style={props.styles?.categoryTitle}
            >
                {props.title}
            </div>
        </div>
    );
}

export default CategoryTitle;
