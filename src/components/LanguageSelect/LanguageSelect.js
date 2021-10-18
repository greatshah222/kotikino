import { getImageByKey } from "../../scripts/getImageByKey";
import { useTranslation } from 'react-i18next';
import { useMyContext } from "../../contexts/StateHolder";

const LanguageSelect = () => {

    // Bring stateholders from context
    const { setLanguage } = useMyContext();

    const { t, i18n } = useTranslation();

    const changeLanguage = lang => {
        i18n.changeLanguage(lang);
        setLanguage(lang);
    };

    return (

        <div className="languageSelect">
            <img
                className="langFlag"
                src={getImageByKey("flag_fi")}
                title={t("Finnish")}
                alt={t("Finnish")}
                onClick={() => changeLanguage("fi_FI") }
            />
            <img
                className="langFlag"
                src={getImageByKey("flag_en")}
                title={t("English")}
                alt={t("English")}
                onClick={() => changeLanguage("en_US")}
            />
            <img
             className="langFlag"
             src={getImageByKey("flag_sv")}
             title={t("Swedish")}
             alt={t("Swedish")}
             onClick={() => changeLanguage("sv_SE")}
             />
        </div>
    );
}

export default LanguageSelect;