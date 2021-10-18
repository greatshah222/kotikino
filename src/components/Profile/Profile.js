import { useMyContext } from "../../contexts/StateHolder";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ChangePassword from "./ChangePassword";
import UserDetails from "./UserDetails";
import CurrentSubscription from "./CurrentSubscription";

const Profile = () => {

    // Bring stateholders from context
    const { user } = useMyContext();

    // Holds state of chosen menu option, which user wants to view
    const [chosenMenuOption, setChosenMenuOption] = useState("userDetails");

    // Setup translate function
    const { t } = useTranslation();

    // TODO: UseEffect to fetch userdata from API

    // Render view, depending on selected menu option
    const renderOptions = () => {
        if (chosenMenuOption === "userDetails") {
            return (
                <UserDetails />
            )
        } else if (chosenMenuOption === "subscriptions") {
            return (
                <CurrentSubscription />
            )
        } else if (chosenMenuOption === "changePassword") {
            return (
                <ChangePassword />
            )
        }
    }

    if (user.loggedIn) {

        return (
            <div className="profile-container">
                <div className="profile-menu">

                    <div className="profile-menu-option" onClick={() => setChosenMenuOption("userDetails")}>
                        {t("User details")}
                    </div>
                    <div className="profile-menu-option" onClick={() => setChosenMenuOption("subscriptions")}>
                        {t("Subscriptions")}
                    </div>
                    <div className="profile-menu-option" onClick={() => setChosenMenuOption("changePassword")}>
                        {t("Change password")}
                    </div>

                </div>
                <div className="profile-option-view">
                    {renderOptions()}
                </div>
            </div>
        );
    } else {
        return (
            <div className="profile-container">
                <div className="loginFirstMessage" >{t("To view this page, you need to login first")}</div>
            </div>
        )
    }
}

export default Profile;
