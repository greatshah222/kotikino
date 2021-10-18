import { useMyContext } from "../../contexts/StateHolder";
import { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import { createToken } from "../../scripts/utils";
import { getEpisodes } from "../../scripts/dataHandlers";
import DetailsFolderNames from "./DetailsFolderNames";
import DetailsContentRatings from "./DetailsContentRatings";
import DetailsItemDescription from "./DetailsItemDescription";
import DetailsSeasonsAndEpisodes from "./DetailsSeasonsAndEpisodes";
import DetailsAssetBanner from "./DetailsAssetBanner";
//import DetailsShare from "./DetailsShare";
//import { getAssets } from "../scripts/dataHandlers";
//import { createAssetIdToken } from "../scripts/utils";

const DetailsSerie = (props) => {

  // Bring stateholders from context
  const { chosenItem, language, organizationId, key } = useMyContext();

  const [episodes, setEpisodes] = useState([]);

  //const { asset } = useParams();
  useEffect(() => {
    async function getData() {
      try {
        // Call createToken function to create new token from given data
        let serieToken = createToken(organizationId, chosenItem.serie.id, key);

        const episodeList = await getEpisodes(organizationId, chosenItem.serie.id, serieToken, language);

        setEpisodes(episodeList)

      } catch (err) {
        console.log(err);
      }
    }
    if (language && organizationId && key && chosenItem !== "") {
      getData();
    }
  }, [language, chosenItem, organizationId, key]);

  const renderSerieDetails = () => {
    return (

      <div className="detailsContainer">
        <DetailsAssetBanner styles={props.styles} />
  
        <div className="details-description-container">
          <div className="detailsDescriptionTitleContainer">
              <div className="details-description-title-left">
                <div className="details-description-title-name">
                  {chosenItem.serie.title}
                </div>
                <DetailsFolderNames styles={props.styles} />
              </div>
              <div className="details-description-title-right">
                <DetailsContentRatings styles={props.styles} />
              </div>
          </div>
          <div className="details-description-info-container">
            <DetailsItemDescription
              desc={chosenItem.serie.description}
              styles={props.styles}
            />
          </div>
        </div>
  
        <DetailsSeasonsAndEpisodes episodes={episodes} styles={props.styles} />
  
      </div>
    );
  }
 

  return (
    chosenItem !== "" ? renderSerieDetails() : <div className="informPlaceholder" > SERIE DETAILS WILL BE HERE </div>
  );
}

export default DetailsSerie;