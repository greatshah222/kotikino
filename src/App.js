import './App.css';
import './Shared/FontAwesomeIcon';
import NavBar from './components/NavBars/NavBar';
import CategoryContentSimiliar from './components/ViewAssets/Sliders/CategoryContentSimiliar';
import DetailsVideo from './components/Details/DetailsVideo';
import DetailsSerie from './components/Details/DetailsSerie';
import FAQ from './components/FAQ/FAQ';
import TOS from './components/TOS/TOS';
import ChosenCategoryGrid from './components/ViewAssets/Grids/ChosenCategoryGrid';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useMyContext } from './contexts/StateHolder';
import BottomBar from './components/Footers/BottomBar';
import Profile from './components/Profile/Profile';
import settings from './configs/config_settings.json';
import styles from './configs/config_styles.json';
import Banner from './components/ViewAssets/Sliders/Banner';
import Promo from './components/ViewAssets/Sliders/Promo';
import Search from './components/Search/Search';
import CategoriesWithTitles from './components/ViewAssets/Sliders/CategoriesWithTitles';
import { getCategories } from './scripts/dataHandlers';
import LanguageSelect from './components/LanguageSelect/LanguageSelect';
import RenderCategoryDropdown from './components/DropDowns/CategoryDropdown';
import LoginBTN from './components/Login/LoginBTN';
import NavBarButton from './components/NavBars/NavBarButton';
import AssetVideoPlayer from './components/VideoPlayer/AssetVideoPlayer';
import SignUpBar from './components/SignUp/SignUpBar';
import SignUpForm from './components/SignUp/SignUpForm';
import LoginForm from './components/Login/LoginForm';
import { useCookies } from 'react-cookie';

/*
118836313 = TVOD listing

118836315 = SVOD listing

118863705 = SVOD listing

Vuokraamo etusivu = 123703424 root category
SVOD etusivu: 123703428

Banneri 118863706
Promot 118863714

page structure:
- banner
- promotions
- 3 x category listing

use this category as root for homepage: 118836311

Kotkino SVOD banner: 123703449


Vuokraamo banner: 123703450
*/

function App() {
  // Bring stateholders from context
  const {
    setAllCategories,

    key,
    setKey,

    organizationId,
    setOrganizationId,

    language,
    setLanguage,

    user,
    setUser,
  } = useMyContext();

  const [cookies] = useCookies('');

  /**** STEP 1, FIRST TIME INIT PROGRAM ****/
  useEffect(() => {
    async function initProgram() {
      try {
        // TODO: Import from suite, now importing just from config.json

        // Set organizationId to context
        setOrganizationId(settings.organization.organizationId);

        // Set key to context
        setKey(settings.organization.key);

        console.log('app.js cookies: ', cookies);
        // If there's existing userToken in cookies
        if (cookies?.userData?.userToken) {
          // Get user from context and copy it to modifiedUser
          let modifiedUser = { ...user };

          // Change status of user as logged in
          modifiedUser.loggedIn = true;

          // Set userToken from cookies
          modifiedUser.userId = cookies?.userData?.userId;

          // Set userToken from cookies
          modifiedUser.userToken = cookies?.userData?.userToken;

          // Update user in context, with modified data
          setUser(modifiedUser);
        }

        // Set language from config and set it to context
        setLanguage(settings.language);
      } catch (err) {
        console.log(err);
      }
    }

    initProgram();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**** STEP 2, CHECK LANGUAGE AND GET CATEGORIES (STEP WILL BE REPEATED IF LANGUAGE CHANGES) ****/
  useEffect(() => {
    async function getAndSetCategories() {
      try {
        // Get categories from datahandler
        const categoryList = await getCategories(
          organizationId,
          key,
          language,
          user
        );

        // Set categories in context
        setAllCategories(categoryList);
      } catch (err) {
        console.log(err);
      }
    }

    // Get categories only if language is set
    if (language !== '') {
      getAndSetCategories();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <div className='App'>
      <div className='container' style={styles?.container}>
        <Switch>
          {/* ROUTE FOR PLAY VIDEO*/}
          <Route path={`/${settings.routes.playVideo}/:orgId/:asset`}>
            <AssetVideoPlayer backRoute={'/'} playerAutoStart={true} />
          </Route>

          <Route>
            <NavBar
              styles={settings.styles}
              links={
                <div className='navBarRow'>
                  <NavBarButton route={settings.routes.svod} name={'SVOD'} />
                  <NavBarButton route={settings.routes.tvod} name={'TVOD'} />
                  <NavBarButton route={settings.routes.faq} name={'FAQ'} />
                  <NavBarButton
                    route={settings.routes.search}
                    name={'Search'}
                  />
                  {/* <NavBarCategoryDropDown styles={styles} route={settings.routes.svodCategoriesRoute} /> */}
                  <LanguageSelect styles={styles} />

                  <LoginBTN
                    routes={`/${settings.routes.signUp}`}
                    styles={styles}
                  />
                </div>
              }
            />

            {/* ROUTE FOR FRONT PAGE */}
            <Route path='/' exact>
              {user.loggedIn ? (
                <div className='homeContainer'>
                  <Banner
                    settings={settings.components.frontPageBanner_01}
                    styles={styles}
                  />

                  <Promo
                    settings={settings.components.frontPagePromo_01}
                    styles={styles}
                  />

                  <CategoriesWithTitles
                    settings={settings.components.frontPageCategories_01}
                    styles={styles}
                  />

                  <CategoriesWithTitles
                    settings={settings.components.frontPageCategories_02}
                    styles={styles}
                  />
                </div>
              ) : (
                <div className='homeContainer'>
                  <SignUpBar styles={styles} routes={settings.routes} />
                </div>
              )}
            </Route>

            {/* ROUTE FOR SVOD VIEW*/}
            <Route path={`/${settings.routes.svod}`} exact>
              <Banner
                settings={settings.components.svodBanner_01}
                styles={styles}
              />
              <Promo
                settings={settings.components.svodPromo_01}
                styles={styles}
              />
              <RenderCategoryDropdown
                styles={styles}
                route={settings?.routes.svodCategoriesRoute}
              />
              <CategoriesWithTitles
                settings={settings.components.svodCategories_01}
                styles={styles}
              />
            </Route>

            {/* ROUTE FOR TVOD VIEW*/}
            <Route path={`/${settings.routes.tvod}`} exact>
              <Banner
                settings={settings.components.tvodBanner_01}
                styles={styles}
              />
              <Promo
                settings={settings.components.tvodPromo_01}
                styles={styles}
              />
              <RenderCategoryDropdown
                styles={styles}
                route={settings?.routes.tvodCategoriesRoute}
              />
              <CategoriesWithTitles
                settings={settings.components.tvodCategories_01}
                styles={styles}
              />
            </Route>

            {/* ROUTE FOR SVOD VIDEO DETAILS VIEW*/}
            <Route path={`/${settings.routes.svodVideoRoute}/:asset`} exact>
              <DetailsVideo styles={styles} />
              <CategoryContentSimiliar
                settings={settings.components.svodSimiliar_01}
                styles={styles}
              />
            </Route>

            {/* ROUTE FOR SVOD SERIE DETAILS VIEW*/}
            <Route path={`/${settings.routes.svodSerieRoute}/:asset`} exact>
              <DetailsSerie styles={styles} />
            </Route>

            {/* ROUTE FOR TVOD VIDEO DETAILS VIEW*/}
            <Route path={`/${settings.routes.tvodVideoRoute}/:asset`} exact>
              <DetailsVideo styles={styles} />
              <CategoryContentSimiliar
                settings={settings.components.tvodSimiliar_01}
                styles={styles}
              />
            </Route>

            {/* ROUTE FOR TVOD SERIE DETAILS VIEW*/}
            <Route path={`/${settings.routes.tvodSerieRoute}/:asset`} exact>
              <DetailsSerie styles={styles} />
            </Route>

            {/* ROUTE FOR FAQ VIEW*/}
            <Route path={`/${settings.routes.faq}`}>
              <FAQ styles={styles} />
            </Route>

            {/* ROUTE FOR TOS VIEW*/}
            <Route path={`/${settings.routes.tos}`}>
              <TOS styles={styles} />
            </Route>

            {/* ROUTE FOR SVOD CATEGORIES VIEW*/}
            <Route
              path={`/${settings.routes.svodCategoriesRoute}/:asset`}
              exact
            >
              <RenderCategoryDropdown
                styles={styles}
                route={settings?.routes.svodCategoriesRoute}
              />
              <ChosenCategoryGrid
                styles={styles}
                settings={settings.components.svodChosenCategoryGrid_01}
              />
            </Route>

            {/* ROUTE FOR TVOD CATEGORIES VIEW*/}
            <Route
              path={`/${settings.routes.tvodCategoriesRoute}/:asset`}
              exact
            >
              <RenderCategoryDropdown
                styles={styles}
                route={settings?.routes.tvodCategoriesRoute}
              />
              <ChosenCategoryGrid
                styles={styles}
                settings={settings.components.tvodChosenCategoryGrid_01}
              />
            </Route>

            {/* ROUTE FOR PROFILE VIEW*/}
            <Route path={`/${settings.routes.profile}`}>
              <Profile styles={styles} />
            </Route>

            {/* ROUTE FOR SEARCH VIEW*/}
            <Route path={`/${settings.routes.search}`}>
              <Search
                styles={styles}
                routes={{
                  videoRoute: 'svod/detailsVideo',
                  serieRoute: 'svod/detailsSerie',
                }}
              />
            </Route>

            {/* ROUTE FOR LOGIN VIEW*/}
            <Route path={`/${settings.routes.login}`}>
              <LoginForm routes={settings.routes} styles={styles} />
            </Route>

            {/* ROUTE FOR SIGNUP VIEW*/}
            {/* redirectRoute={settings.routes.packages} */}
            <Route path={`/${settings.routes.signUp}`}>
              <SignUpForm
                styles={styles}
                routes={settings.routes}
                redirectRoute={'/'}
              />
            </Route>

            <BottomBar styles={styles} routes={settings.routes} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

/*
DEMO
"organizationId": "22890",
"key": "11"

KIRJASTOKINO
"organizationId": "7928639",
"key": "dvQyjAcG5x"

KOTIKINO
"organizationId": "70283302",
"key": "tALYp77Jvr"
*/
