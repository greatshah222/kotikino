import { useMyContext } from "../../contexts/StateHolder";
import DetailsFolderNames from "./DetailsFolderNames";
import DetailsContentRatings from "./DetailsContentRatings";
import DetailsInfoData from "./DetailsInfoData";
import DetailsItemDescription from "./DetailsItemDescription";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { createAssetIdToken } from "../../scripts/utils";
import { getAsset } from "../../scripts/dataHandlers";
import DetailsAssetBanner from "./DetailsAssetBanner";
import DetailsShare from "./DetailsShare";

const DetailsVideo = (props) => {

  // Bring stateholders from context
  const { chosenItem, setChosenItem, language, key, organizationId } = useMyContext();

  const { asset } = useParams();

  useEffect(() => {
    async function fetchAsset() {
      try {
        // Call createToken function to create new token from given data
        let token = createAssetIdToken(organizationId, asset, language, key);

        const assetResponse = await getAsset(organizationId, asset, token, language);

        setChosenItem(assetResponse);
      } catch (err) {
        console.log(err);
      }
    }

    if (language && !chosenItem) {
      fetchAsset();
    }
  }, [asset, chosenItem, key, language, organizationId, setChosenItem]);

  console.log(window.location.href);
  const renderDetails = () => {
    return (
      <div className="detailsContainer">
        <DetailsAssetBanner styles={props.styles} />

        <div className="details-description-container">
          <div className="detailsDescriptionTitleContainer">
            <div className="details-description-title-left">
              <div className="details-description-title-name">
                {chosenItem.name}
              </div>
              {chosenItem.folders ? <DetailsFolderNames styles={props.styles} /> : null}
            </div>
            <div className="details-description-title-right">
              {chosenItem.contentRatings ? <DetailsContentRatings styles={props.styles} /> : null}
            </div>
          </div>
          <div className="details-description-info-container">
            <div className="detailsDescriptionContainer">
              <DetailsItemDescription
                item={chosenItem.description}
                styles={props.styles}
              />
            </div>
            <div className="detailsInfoContainer">
              <DetailsInfoData
                item={chosenItem}
                styles={props.styles}
              />
            </div>
          </div>

          <DetailsShare chosenItem={chosenItem}/>
        </div>

      </div>
    )
  }

  // TODO: If /detailsVideo, take parameters and render loading while fetching data or something like that
  return (
    chosenItem ? renderDetails() : null
  );
}

export default DetailsVideo;