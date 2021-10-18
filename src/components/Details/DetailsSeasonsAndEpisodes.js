import { useMyContext } from "../../contexts/StateHolder";
import DetailsContentRatings from "./DetailsContentRatings";
import DetailsItemDescription from "./DetailsItemDescription";
import { convertDuration } from "../../scripts/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Renders props item
const RenderSeasonsAndEpisodes = (props) => {

    // Bring stateholders from context
    const { chosenItem } = useMyContext();

    const [season, setSeason] = useState(1);

    const { t } = useTranslation();

    const renderSeasonNumbers = () => {
        let seasons = [];

        if (props.episodes.length > 0) {
            // Find highest season number from episodes
            props.episodes.forEach(episode => seasons.includes(episode.seasonNumber) ? null : seasons.push(episode.seasonNumber));

            // Sort episodes so smallest number is first
            seasons = seasons.sort((a, b) => a - b);

            return seasons.map((season) => {
                return (
                    <div
                        className="seasonNumber"
                        key={season}
                        onClick={() => setSeason(season)}
                        style={props.styles?.seasonNumber}
                    >
                        {season}
                    </div>
                )
            })
        }
    };

    const renderSeasonContent = () => {
        let seasonEpisodes = props.episodes.filter(episode => episode.seasonNumber === season);

        // Sort episodes so smallest number is first
        seasonEpisodes = seasonEpisodes.sort((a, b) => a.episodeNumber - b.episodeNumber);

        return seasonEpisodes.map((item) => {
            return (
                <div
                    className="episodeDetailsItem"
                    key={item.id}
                    style={props.styles?.episodeDetailsItem}
                >
                    <div
                        className="episodeDetailsLeft"
                        style={props.styles?.episodeDetailsLeft}
                    >
                        <div className="thumbnail-container">
                            <div className="play" />
                            <LazyLoadImage effect="blur" className="episode-list-img" src={item.thumbnailSmall ? item.thumbnailSmall : item.bannerImageSmall} alt="" />
                        </div>
                    </div>

                    <div
                        className="episodeDetailsMiddle"
                        style={props.styles?.episodeDetailsMiddle}
                    >

                        <div className="episodeDetailsMiddleTop">
                            <div>{`${item.episodeNumber}. ${item.name}`}</div>
                            {item.duration ? <div className={"info-duration"}>{convertDuration(item.duration)}</div> : null}
                        </div>

                        <div className="episodeDetailsMiddleBottom">
                            <DetailsItemDescription
                                desc={item.description ? item.description : chosenItem.description}
                                styles={props.styles}
                            />
                        </div>

                    </div>

                    <div
                        className="episodeDetailsRight"
                        style={props.styles?.episodeDetailsRight}
                    >
                        <DetailsContentRatings item={item} styles={props.styles} />
                    </div>
                </div>
            )
        }
        )
    };

    return (
        <div className="seasonsAndEpisodesContainer">
            <div className="series-seasons-container">
                <div className="series-seasons-header">{t("Season")}</div>
                <div className="series-seasons-numbers">
                    {renderSeasonNumbers()}
                </div>
            </div>

            <div className="series-episode-list">
                {renderSeasonContent()}
            </div>
        </div>
    );
}

export default RenderSeasonsAndEpisodes;
