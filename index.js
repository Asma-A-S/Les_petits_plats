import { recipes } from "./data/recipes.js";

import {
	displayRecipes,
	updateFiltredDropdowns,
	updateRecipeCount,
} from "./scripts/controllers/displayControl.js";

import { SearchController } from "./scripts/controllers/searchController.js";
const searchController = new SearchController(recipes);
//initialiser l'application
function init() {
	let filteredRecipes = [...recipes];
	//afficher toutes les recettes au démarage et les listes déroulantes
	displayRecipes(filteredRecipes);
	updateRecipeCount(filteredRecipes.length);
	updateFiltredDropdowns(filteredRecipes);

	//initialise les évènements de recherche
	searchByNameInput(searchController);
	searchByTag();
}

//déclencher la recherche par saisie input
function searchByNameInput() {
	const searchInput = document.getElementById("searchByName");
	searchInput.addEventListener("keyup", (e) => {
		const query = e.target.value.trim().toLowerCase();
		if (query.length >= 3) {
			const filtered = searchController.search(query, "name");
			displayRecipes(filtered);
			updateRecipeCount(filtered.length);
		}
	});
}

//déclencher la recherche par ingrédient / ustensil/ appliance
function searchByTag() {
	const tagInputs = document.querySelectorAll(".tag-input"); // Sélectionner les éléments appropriés dans le DOM
	tagInputs.forEach((tagInput) => {
		tagInput.addEventListener("click", (e) => {
			const type = e.target.dataset.type; // Récupérer le type de tag (ingredient, ustensil, appliance)
			const query = e.target.textContent.trim().toLowerCase();
			if (query && type) {
				const filtered = searchController.search(query, type);
				displayRecipes(filtered);
				updateRecipeCount(filtered.length);
			}
		});
	});
}
init();
