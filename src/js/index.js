import Search from "./model/Search";
import Recipe from "./model/Recipe";
import * as searchView from "./view/searchView";
import * as recipeView from "./view/recipeView";
import { elements, renderLoader, clearLoader } from "./view/base";
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();

  //const query = "pizza";
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

const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    state.recipe = new Recipe(id);
    try {
      console.log(id);
      await state.recipe.getRecipe();
      console.log(state.recipe.ingredients);
      state.recipe.parseIngredients();
      console.log(state.recipe.ingredients);
      //testing
      //window.r = state.recipe;
      state.recipe.calcServings();
      state.recipe.calcTime();
      // 5) Render results on UI
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      alert("error in recipe search index");
      clearLoader();
    }
  }
};
// //testing
// window.addEventListener("load", (e) => {
//   e.preventDefault();
//   controlSearch();
// });

["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);

// Handling recipe button clicks
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    // Increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  }
});
