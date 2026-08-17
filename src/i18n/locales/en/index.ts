import common from "./common.json";
import landing from "./landing.json";
import addons from "./addons.json";
import useCases from "./use-cases.json";
import pricing from "./pricing.json";
import business from "./business.json";
import support from "./support.json";
import sponsors from "./sponsors.json";
import openSourceAccessibility from "./open-source-accessibility.json";
import privacy from "./privacy.json";
import docsCommon from "./docs/common.json";
import docsMac from "./docs/mac.json";
import platformReleases from "./platform-releases.json";

const translations = {
  ...common,
  ...landing,
  ...addons,
  ...useCases,
  ...pricing,
  ...business,
  ...support,
  ...sponsors,
  ...openSourceAccessibility,
  ...privacy,
  ...docsCommon,
  ...docsMac,
  ...platformReleases,
} satisfies Record<string, string>;

export default translations;
