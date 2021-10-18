import { useMyContext } from "../../contexts/StateHolder";

// Renders contentRatings of chosen item
const RenderFolderNames = (props) => {

    // Bring stateholders from context
    const { chosenItem } = useMyContext();

    const renderFolderNames = () => {
        return chosenItem.folders.map((cat, i) => {
            return (
                <div
                    className={"folderName"}
                    key={cat.id}
                    style={props?.styles?.folderName}
                >
                    {cat.name}
                    {i < chosenItem.folders.length - 1 ? "," : null}
                </div>
            );
        });
    };

    return (
        <div className="folderNamesList" style={props?.styles?.folderNamesList}>
            {renderFolderNames()}
        </div>
    );
}

export default RenderFolderNames;
