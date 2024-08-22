import { recipes } from "./data/recipes.js";

import {
	displayRecipes,
	updateFiltredDropdowns,
	updateRecipeCount,
} from "./scripts/controllers/displayControl.js";

import {
	initSearchByTag,
	openCloseDropdown,
	closeTag,
	setupSearchFilter,
} from "./scripts/utils/eventHandlers.js";

import { SearchController } from "./scripts/controllers/searchController.js";
const searchController = new SearchController(recipes);

let selectedItemTags = [];

function init() {
	const filteredRecipes = [...recipes];
	displayRecipes(filteredRecipes);
	updateRecipeCount(filteredRecipes.length);
	updateFiltredDropdowns(filteredRecipes);
	initSearchByNameInput();
	setupSearchFilters();
	const tagInputs = document.querySelectorAll(".tag-input");
	initSearchByTag(tagInputs, searchByTag);

	const tagButtons = document.querySelectorAll(".tag-select");
	openCloseDropdown(tagButtons);

	const tagContainer = document.getElementById("selectedTags");
	closeTag(tagContainer, removeTag);
}
// Déclencher la recherche par saisie input
function initSearchByNameInput() {
	const searchInput = document.getElementById("searchByName");
	searchInput.addEventListener("keyup", (e) => {
		const query = e.target.value.trim().toLowerCase();
		if (query.length >= 3) {
			searchController.resetFilters();
			const filteredRecipes = searchController.search(query, "name");
			displayRecipes(filteredRecipes);
			updateRecipeCount(filteredRecipes.length);
		}
	});
}
function searchByTag(query, type) {
	// Vérifier si le tag n'est pas déjà sélectionné
	if (
		!selectedItemTags.some((tag) => tag.item === query && tag.type === type)
	) {
		selectedItemTags.push({ item: query, type: type });
		addTag(query, type);
		applyAllTagsFilters();
	}
}
// ajouter les tags sélectionnées
function addTag(query, type) {
	const tagContainer = document.getElementById("selectedTags");
	const tagItem = document.createElement("div");
	tagItem.className = "tag-item";
	tagItem.innerHTML = `
		<span>${query}</span>
		<button class="remove-tag" data-item="${query}" data-type="${type}">
			<img src="/assets/vectorClose.png" alt="Remove Tag">
		</button>`;
	tagContainer.appendChild(tagItem);
}

//retirer le tag
function removeTag(query, type) {
	selectedItemTags = selectedItemTags.filter(
		(tag) => !(tag.item === query && tag.type === type)
	);
	applyAllTagsFilters();
}

function applyAllTagsFilters() {
	// Réinitialiser les recettes filtrées
	searchController.resetFilters();

	// Appliquer les filtres pour chaque tag sélectionné
	selectedItemTags.forEach(({ item, type }) => {
		searchController.search(item, type);
	});

	// Afficher les résultats filtrés
	const filteredRecipes = searchController.filteredRecipes;
	displayRecipes(filteredRecipes);
	updateRecipeCount(filteredRecipes.length);
}

//initier la recherche par input dans les tags
function setupSearchFilters() {
	setupSearchFilter("inputIngredient", "#ingredient-dropdown");
	setupSearchFilter("inputAppliance", "#appliance-dropdown");
	setupSearchFilter("inputUstensil", "#ustensil-dropdown");
}

init();
