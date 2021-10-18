import { useMyContext } from "../../contexts/StateHolder";

// Renders description of chosen item
// Priorizes props, if used as child
const RenderItemDescription = (props) => {

  // Bring stateholders from context
  const { chosenItem } = useMyContext();

  const renderItemDescription = (desc) => {
    return (
      <div className="itemDescription" style={props?.styles?.itemDescription} dangerouslySetInnerHTML={{ __html: desc }} />
    );
  };

  return (
    renderItemDescription(props.desc ? props.desc : chosenItem.description)
  );
}

export default RenderItemDescription;
