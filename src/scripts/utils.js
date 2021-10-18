const crypto = require('crypto');

// Converts seconds to hours and minutes
const convertDuration = (dur) => {
  const dS = Number(dur);

  const h = Math.floor(dS / 3600);
  const m = Math.floor(dS % 3600 / 60);
  //const s = Math.floor(dS % 3600 % 60);

  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

// TOKEN CREATOR
const createToken = (organizationId, groupItemId, key) => {

  const currentTime = getCurrentTime();
  const signature = crypto.createHash('md5').update(`${organizationId}:${groupItemId}:${currentTime}:${key}`).digest("hex");

  return "05" + currentTime + signature;
};

// TOKEN CREATOR FOR ASSETS
const createAssetIdToken = (organizationId, assetId, languageId, key) => {

  const currentTime = getCurrentTime();
  let signature;

  if (!languageId) {
    signature = crypto
      .createHash('md5')
      .update(`${organizationId}:${assetId}:${currentTime}:${key}`)
      .digest('hex')
  } else {
    signature = crypto
      .createHash('md5')
      .update(`${organizationId}:${assetId}:${languageId}:${currentTime}:${key}`)
      .digest('hex');
  }

  return "03" + currentTime + signature;
};

// TOKEN CREATOR FOR ACCOUNT MANAGEMENT
const createAccountToken = (userId, organizationId, key, firstName, lastName, phoneNumber, countryId, regionId, cityName, postalCode, eMail) => {

  const currentTime = getCurrentTime();
  const signature = crypto
      .createHash('md5')
      .update(`${organizationId}:${userId}:${firstName}:${lastName}:${countryId}:${regionId}:${postalCode}:${cityName}:${phoneNumber}:${currentTime}:${key}`)
      .digest('hex')

  return "01" + currentTime + signature;
};

// TOKEN CREATOR FOR PASSWORD CHANGING PROCESS
const createChangePasswordToken = (organizationId, key, userId, newPassword, confirmPassword) => {

  const currentTime = getCurrentTime();
  const signature = crypto
      .createHash('md5')
      .update(`${organizationId}:${userId}:${newPassword}:${confirmPassword}:${currentTime}:${key}`)
      .digest('hex')

  return "01" + currentTime + signature;
};

// GroupItemId creates string from category id:s, separated with comma and returns it to main program
const createGroupItemId = (categories, exclude) => {

  let groupItemId = "";

  // Add id:s to string, separating with comma. On last item, dont add comma.
  for (let i = 0; i < categories.length; i++) {
    if (exclude && !exclude.includes(categories[i].id)) {
      if (i === (categories.length - 1)) {
        groupItemId += `${categories[i].id}`;
      } else {
        groupItemId += `${categories[i].id},`;
      }
    } else if (!exclude) {
      if (i === (categories.length - 1)) {
        groupItemId += `${categories[i].id}`;
      } else {
        groupItemId += `${categories[i].id},`;
      }
    }
  };
  return groupItemId;
};

// Checks if element is being hovered and if there's any stylechanges in style config
const checkStyle = (style, hovering, element, value) => {
  // If style exists and there's modified values on requested element
  if (style && style[element]) {
    // Get modified values to newStyle
    let newStyle = { ...style[element] };
    // Go through keys of newStyle (name of style to be modified, like background, color... )
    Object.keys(newStyle).forEach(key => {
      // If key has style for Hover (backgroundHover, colorHover....) AND mouse is currently hovering over element
      if (newStyle[key + "Hover"] && hovering === value) {
        // Modify main key (ex. background...) with hovering value (backgroundHover: black -> background: black)
        newStyle[key] = newStyle[key + "Hover"];
      }
    })
    // Return modified style to component
    return newStyle
  }
};

// Fisher-Yates (aka Knuth) Shuffle
const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const checkVod = (routes, pathname) => {
  let vod = "";
  // Check current location, if it's svod or tvod side of a site
  if (pathname.includes(routes.svod)) {
    vod = routes.svod;
  } else {
    vod = routes.tvod;
  }
  return vod;
};

const modifySlickSettings = (settings, items) => {
  // Check number of slides to show from correct responsitivity setting
  const slides = settings.responsive.find(resp => window.innerWidth >= resp.breakpoint).settings.slidesToShow;

  // If there's less or equal amount of items in category than there's slidesToShow, set slick infinite to false to prevent duplicates (slick bug)
  if (items <= slides) {
    settings.infinite = false;
  }
  return settings;
};

// Checks if all arguments of a function are defined
const checkArguments = (...args) => {
  return args.every(arg => arg !== undefined)
};

// Get current time for token creators
const getCurrentTime = () => {
  return Math.floor(new Date().getTime() / 1000).toString(16);
};

export { convertDuration, checkStyle, createToken, createAssetIdToken, createAccountToken, createChangePasswordToken, createGroupItemId, shuffle, checkVod, modifySlickSettings, checkArguments };