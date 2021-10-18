//import { useMyContext } from "../../contexts/StateHolder";
//import { useState } from "react";
import { useTranslation } from "react-i18next";
//import { changePassword, updateUser } from "../../scripts/dataHandlers";

const CurrentSubscription = () => {

    // Bring stateholders from context
    //const { user, setUser, organizationId, key } = useMyContext();

    // Setup translate function
    const { t } = useTranslation();

    return (
        <div>{t("Your active subscriptions")}</div>
    )
}

export default CurrentSubscription;
