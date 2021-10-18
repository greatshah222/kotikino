import { useHistory } from "react-router-dom";
import { getImageByKey } from "../../scripts/getImageByKey";
import { useTranslation } from "react-i18next";
import { useMyContext } from "../../contexts/StateHolder";

const NavBar = (props) => {

    const { t } = useTranslation();

    const history = useHistory();

    // Bring stateholders from context
    const { setChosenTab } = useMyContext();

    return (
        <div className="navBar" style={props?.styles?.navBar}>

            <img
                className="navBarSiteLogo"
                src={getImageByKey("siteLogo")}
                title={t("Back to Home")}
                alt="SiteName"
                onClick={() => {history.push("/"); setChosenTab("home")}}
                style={props?.styles?.navBar}
            >
            </img>

            {props.links}
        </div>
    );
}

export default NavBar;