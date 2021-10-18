import { useMyContext } from "../../contexts/StateHolder";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCookies } from 'react-cookie';
import { changePassword } from "../../scripts/dataHandlers";
import { validatePassword } from "../../scripts/inputValidators";

const ChangePassword = () => {

    // Bring stateholders from context
    const { organizationId, key } = useMyContext();

    // Holds inform message for form
    const [formMessage, setFormMessage] = useState("");

    const [cookies] = useCookies("");

    const [formOldPassword, setFormOldPassword] = useState("");
    const [formNewPassword, setFormNewPassword] = useState("");
    const [formNewPasswordAgain, setFormNewPasswordAgain] = useState("");
    const [passwordSecurityLevel, setPasswordSecurityLevel] = useState("");

    // Setup translate function
    const { t } = useTranslation();

    /**** VALIDATE PASSWORD ****/
    useEffect(() => {
        const validationResults = validatePassword(formNewPassword);

        setPasswordSecurityLevel(validationResults.securityLevel);

    }, [formNewPassword]);

    const handleChangePassword = async (e) => {

        e.preventDefault();
        // TODO: Check if old password is correct, API request for this or use some other?

        // Placeholder to make oldPasswordCheck true
        const oldPasswordCheck = true;

        // If old password was correct
        if (oldPasswordCheck) {
            const userId = cookies?.userData?.userId;

            // Do the signUp/login process
            const response = await changePassword(organizationId, key, userId, formNewPassword, formNewPasswordAgain);

            console.log(response);

            response.data.status === "ok" ? setFormMessage(t("Password changed successfully")) : setFormMessage(t("Something went wrong, please try again"));

            setFormOldPassword("");
            setFormNewPassword("");
            setFormNewPasswordAgain("");
        } else {
            setFormMessage(t("Old password was incorrect"))
        }
    }

    return (
        <form id="userDetails-form" onSubmit={(e) => handleChangePassword(e)}>

            <div className="inputColumn">
                <div className="profile-details-text">{t("Old password")}</div>
                <input className="profileFormInput" type="password" value={formOldPassword} onChange={(e) => setFormOldPassword(e.target.value)} />
            </div>

            <div className="inputColumn">
                    <div className="profile-details-text">{t("New password")}</div>
                    <input className="profileFormInput" type="password" value={formNewPassword} onChange={(e) => setFormNewPassword(e.target.value)} />
                <div className="pwdSecurityContainer">{`Password stength: ${passwordSecurityLevel} (to be updated with proper indicator)`}</div>
            </div>

            <div className="inputColumn">
                <div className="profile-details-text">{t("New password again")}</div>
                <input className="profileFormInput" type="password" value={formNewPasswordAgain} onChange={(e) => setFormNewPasswordAgain(e.target.value)} />
                <div className="pwdSecurityContainer">{formNewPassword === formNewPasswordAgain ? null : t("New password and confirm password don't match")}</div>
            </div>

            <button type="submit" className="profileFormBTN" disabled={passwordSecurityLevel >= 3 && formNewPassword === formNewPasswordAgain ? false : true}>{t("Save")}</button>

            <div className="profileMessage">{formMessage}</div>

        </form>
    )
}

export default ChangePassword;
