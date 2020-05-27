import Search from "./model/Search";
import Recipe from "./model/Recipe";
import * as searchView from "./view/searchView";
import { elements, renderLoader, clearLoader } from "./view/base";
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) Search for recipes
      await state.search.getResults();

      // 5) Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert("Something wrong with the search...");
      clearLoader();
    }
  }
};
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

//event bubbling
elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    //console.log(btn);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * SEARCH CONTROLLER
 */

const controlRecipe = () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    state.recipe = new Recipe(id);
    try{
      console.log(id);
      r.getRecipe();
      console.log(r)
    }catch(err){
alert("error in recipe search index")
    }
    
  }
};

["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);
