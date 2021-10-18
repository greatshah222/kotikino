import { useMyContext } from "../../contexts/StateHolder";
import { convertDuration } from "../../scripts/utils";
import { useTranslation } from "react-i18next";

// Renders contentRatings of chosen item
// Priorizes props, if used as child.
const RenderInfoData = (props) => {

  // Bring stateholders from context
  const { chosenItem } = useMyContext();

  // Setup translation function
  const { t } = useTranslation();

  const renderInfoData = (data) => {
    return (
      <div className="infoDataContainer">

        <div className={"dataTitle"} style={props?.styles?.dataTitle}>
          {t("Director")}
        </div>

        <div className={"dataValue"} style={props?.styles?.dataValue}>
          {data.director ? data.director : "-"}
        </div>

        <div className={"dataTitle"} style={props?.styles?.dataTitle}>
          {t("Actors")}
        </div>

        <div className={"dataValue"} style={props?.styles?.dataValue}>
          {data.actors ? data.actors.replace(/,/g, ", ") : "-"}
        </div>

        <div className={"dataTitle"} style={props?.styles?.dataTitle}>
          {t("Release year")}
        </div>

        <div className={"dataValue"} style={props?.styles?.dataValue}>
          {data.releaseYear ? data.releaseYear : "-"}
        </div>

        {data.duration ?
          <div className={"dataTitle"} style={props?.styles?.dataTitle}>
            {t("Duration")}
          </div>
          : null}

        {data.duration ?
          <div className={"dataValue"} style={props?.styles?.dataValue}>
            {convertDuration(data.duration)}
          </div>
          : null}

        <div className={"dataTitle"} style={props?.styles?.dataTitle}>
          {t("Languages")}
        </div>

        <div className={"dataValue"} style={props?.styles?.dataValue}>
          -
        </div>

        <div className={"dataTitle"} style={props?.styles?.dataTitle}>
          {t("Subtitles")}
        </div>

        <div className={"dataValue"} style={props?.styles?.dataValue}>
          -
        </div>

      </div>
    );
  };

  return (
    renderInfoData(props.item ? props.item : chosenItem)
  );
}

export default RenderInfoData;
