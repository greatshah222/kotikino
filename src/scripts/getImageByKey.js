import fi_all_ages from '../images/fi_all_ages.png'
import fi_above_7 from '../images/fi_above_7.png'
import fi_above_12 from '../images/fi_above_12.png'
import fi_above_16 from '../images/fi_above_16.png'
import fi_above_18 from '../images/fi_above_18.png'
import fi_distress from '../images/fi_distress.png'
import fi_sex from '../images/fi_sex.png'
import fi_violence from '../images/fi_violence.png'
import fi_drugs from '../images/fi_drugs.png'
import siteLogo from '../images/siteLogo.png'
import flag_fi from '../images/flag_fi.png'
import flag_en from '../images/flag_en.png'
import flag_sv from '../images/flag_sv.png'
import comingSoon from '../images/comingSoon.png'
import signUpBackground from '../images/signUpBackground.png'

const images = {
  fi_all_ages,
  fi_above_7,
  fi_above_12,
  fi_above_16,
  fi_above_18,
  fi_distress,
  fi_sex,
  fi_violence,
  fi_drugs,
  siteLogo,
  flag_fi,
  flag_en,
  flag_sv,
  comingSoon,
  signUpBackground
};

const getImageByKey = (key) => {
  return images[key]
}

export { getImageByKey };