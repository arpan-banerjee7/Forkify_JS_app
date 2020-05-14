import Search from "./model/Search";
import * as searchView from "./view/searchView";
import { elements, renderLoader, clearLoader } from "./view/base";
const state = {};

const controlSeacrh = async () => {
  const query = searchView.getInput();
  console.log(query);
  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(elements.searchRes);
    await state.search.getResults();
    clearLoader(elements.searchRes);
    console.log(state.search.result);
    searchView.renderResults(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSeacrh();
});
