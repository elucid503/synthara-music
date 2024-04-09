import { GetSearchBasedSuggestions } from "./src/GetSearchBasedSuggestions";
import util from "util";

const input = "am i dreaming";

GetSearchBasedSuggestions(input, {}).then((response) => {
  console.log(util.inspect(response, false, null, true /* enable colors */));
});