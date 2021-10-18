import { useMyContext } from "../../contexts/StateHolder";
import { useState } from "react";
import { countries } from "../../scripts/countries";
import { useTranslation } from "react-i18next";

const UserDetails = () => {

    // Bring stateholders from context
    const { user, setUser } = useMyContext();

    // Holds inform message for form
    const [formMessage, setFormMessage] = useState("");

    // Holders for controlled inputs
    const [formFirstName, setFormFirstName] = useState(user.firstName);
    const [formLastName, setFormLastName] = useState(user.lastName);
    const [formEmail, setFormEmail] = useState(user.eMail);
    const [formCountry, setFormCountry] = useState(user.country);
    const [formPhone, setFormPhone] = useState(user.phone);

    // Setup translate function
    const { t } = useTranslation();

    // TODO: UseEffect to fetch userdata from API

    const saveDetails = (e) => {
        e.preventDefault();

        try {
            // TODO: Add phone number validation

            let usr = { ...user };

            usr.firstName = formFirstName;
            usr.lastName = formLastName;
            usr.eMail = formEmail;
            usr.country = formCountry;
            usr.phone = formPhone;

            // TODO: Save details to DB as well, if success, update setUser and inform about saving done. NO NEED TO SAVE loggedIn state

            setUser(usr);

            setFormMessage(t("Profile updated"));
        } catch (err) {
            console.log(err);
            setFormMessage(t("Something went wrong, please try again"));
        }
    };

    return (
        <form id="userDetails-form" onSubmit={(e) => saveDetails(e)}>

            <div className="inputColumn">
                <div className="profile-details-text">{t("First name")}</div>
                <input className="profileFormInput" type="text" value={formFirstName} onChange={(e) => setFormFirstName(e.target.value)} />
            </div>

            <div className="inputColumn">
                <div className="profile-details-text">{t("Last name")}</div>
                <input className="profileFormInput" type="text" value={formLastName} onChange={(e) => setFormLastName(e.target.value)} />
            </div>

            <div className="inputColumn">
                <div className="profile-details-text">{t("Email")}</div>
                <input className="profileFormInput" type="text" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />
            </div>

            <div className="inputColumn">
                <div className="profile-details-text">{t("Country")}</div>
                <select id="profileFormSelectCountry" className="profileFormInput" name="country" selected={formCountry} value={formCountry} onChange={(e) => setFormCountry(e.target.value)} >
                    {countries.map(country => {
                        return <option value={country} key={country}>{country}</option>
                    })}
                </select>
            </div>

            <div className="inputColumn">
                <div className="profile-details-text">{t("Phone")}</div>
                <input className="profileFormInput" type="text" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} />
            </div>

            <button type="submit" className="profileFormBTN">{t("Save")}</button>

            <div className="profileMessage">{formMessage}</div>

        </form>
    )
}

export default UserDetails;
