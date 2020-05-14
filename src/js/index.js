import Search from "./model/Search";
import * as searchView from "./view/searchView";
import { elements } from "./view/base";
const state = {};

const controlSeacrh = async () => {
  const query = searchView.getInput();
  console.log(query);
  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResult();
    await state.search.getResults();
    console.log(state.search.result);
    searchView.renderResults(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSeacrh();
});
