import React, { useState, useContext } from 'react';

// First create the context
const MyContext = React.createContext();

// Then create a StateHolder wrapper component
// to hold the state that the components need.
const StateHolder = (props) => {
    // Chosen tab, frontPage by default
    const [chosenTab, setChosenTab] = useState("Home");

    // Chosen category
    const [chosenCategory, setChosenCategory] = useState({});

    // Stores all categories fetched with Axios
    const [allCategories, setAllCategories] = useState([]);

    // Stores all movie/serie items, fetched with Axios by using allCategories as groupItemId
    const [allCategoryItems, setAllCategoryItems] = useState({});

    // Stores all movie/serie items, fetched with Axios by using allCategories as groupItemId
    const [bannerItems, setBannerItems] = useState({});

    // Stores all movie/serie items, fetched with Axios by using allCategories as groupItemId
    const [promoItems, setPromoItems] = useState({});

    // Currently viewed item, used in showing details
    const [chosenItem, setChosenItem] = useState("");

    // Holds user data
    const [user, setUser] = useState({ userId: 0, companyId: 0, groupId: 0, userToken: "", username: "", firstName: "", eMail: "", loggedIn: false });

    // Language
    const [language, setLanguage] = useState("");

    // Holds state to toggle loginForm
    const [viewLoginForm, setViewLoginForm] = useState(false);

    // Holds style configuration for elements
    const [style, setStyle] = useState({});

    // Organization Id
    const [organizationId, setOrganizationId ] = useState("");

    // Secret key
    const [key, setKey] = useState("");

    // Holds string of prioritized categories
    const [prioritized, setPrioritized] = useState("");

    // Holds string of banner groupItemId
    const [bannerId, setBannerId] = useState("");

    // Holds string of promo groupItemId
    const [promoId, setPromoId] = useState("");

    // Holds string of prioritized items
    const [prioritizedItems, setPrioritizedItems] = useState("");

    // Holds string of chosen URL to play
    const [chosenURL, setChosenURL] = useState("");

    return (
        <MyContext.Provider value={{

            chosenTab,
            setChosenTab,

            chosenCategory,
            setChosenCategory,

            allCategories,
            setAllCategories,

            allCategoryItems,
            setAllCategoryItems,

            chosenItem,
            setChosenItem,

            chosenURL,
            setChosenURL,

            user,
            setUser,

            viewLoginForm,
            setViewLoginForm,

            style,
            setStyle,

            language,
            setLanguage,

            key,
            setKey,

            organizationId,
            setOrganizationId,

            prioritized,
            setPrioritized,

            bannerId,
            setBannerId,
            
            promoId,
            setPromoId,

            bannerItems,
            setBannerItems,
            
            promoItems,
            setPromoItems,

            prioritizedItems,
            setPrioritizedItems
        }}>
            {props.children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => useContext(MyContext);

export default StateHolder;
