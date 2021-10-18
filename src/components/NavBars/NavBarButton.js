import { useHistory } from "react-router-dom";
import { useMyContext } from "../../contexts/StateHolder";
import { useTranslation } from "react-i18next";

const NavBarButton = (props) => {

    // Bring stateholders from context
    const { chosenTab, setChosenTab } = useMyContext();

    const { t } = useTranslation();

    const history = useHistory();

    return (
        <div className={chosenTab === props.name ? "navBarBTN selected" : "navBarBTN"}
                    key={props.name}
                    style={props?.styles?.navBarBTN}
                    onClick={() => {history.push(`/${props.route}`); setChosenTab(props.name)}}
                >
                    {t(`${props.name}`)}
                </div>
    );
}

export default NavBarButton;