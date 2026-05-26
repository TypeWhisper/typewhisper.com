import common from "./common.json";
import landing from "./landing.json";
import addons from "./addons.json";
import useCases from "./use-cases.json";
import pricing from "./pricing.json";
import business from "./business.json";
import support from "./support.json";
import sponsors from "./sponsors.json";
import privacy from "./privacy.json";
import docsCommon from "./docs/common.json";
import docsMac from "./docs/mac.json";

const translations = {
  ...common,
  ...landing,
  ...addons,
  ...useCases,
  ...pricing,
  ...business,
  ...support,
  ...sponsors,
  ...privacy,
  ...docsCommon,
  ...docsMac,
} satisfies Record<string, string>;

export default translations;
