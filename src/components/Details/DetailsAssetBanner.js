import { FaPlay } from "react-icons/fa";
import { useMyContext } from "../../contexts/StateHolder";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DetailsAssetBanner = (props) => {

  // Bring stateholders from context
  const { chosenItem, organizationId } = useMyContext();

  const history = useHistory();

  const { t } = useTranslation();

  const click = () => {
    history.push(`/playVideo/${organizationId}/${chosenItem.id}`)
  }

  const renderAction = () => {
      return (
        <div
          className="detailsPlayContainer"
          onClick={() => click()}
        >
          <FaPlay className="svg-play" />{t("Watch")}
        </div>
      )
  };

  const renderDetailsAssetBanner = () => {
    return (
        <div
          className="detailsUpper"
        >
          <div
            className="detailsUpperBackground" style={{
              backgroundImage: `url(${chosenItem.isSerie ? chosenItem.serie.bannerImageSmall : chosenItem.bannerImageSmall})`
            }}>
          </div>
          <div className="detailsUpperSmall">
            <div className="detailsUpperCoverContainer">
              <img
                className="detailsUpperCover"
                src={chosenItem.isSerie ? chosenItem.serie.converImageSmall : chosenItem.coverImageSmall}
                alt=""
              ></img>
            </div>
            {renderAction()}
          </div>
        </div>
    )
  }

  return (
    chosenItem ? renderDetailsAssetBanner() : null
  );
}

export default DetailsAssetBanner;