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
	searchByInputTag,
} from "./scripts/utils/eventHandlers.js";

import { SearchController } from "./scripts/controllers/searchController.js";
const searchController = new SearchController(recipes);
let selectedItemTags = [];

function init() {
	const filteredRecipes = [...recipes];
	displayRecipes(filteredRecipes);
	updateRecipeCount(filteredRecipes.length);
	updateFiltredDropdowns(filteredRecipes);

	//initialiser les fonctionnalités avancées
	advancedSearch();
	initSearchByNameInput();
	searchByInputTags();
	handleDropdown();

	const tagContainer = document.getElementById("selectedTags");
	closeTag(tagContainer, removeTag);
}

// Réinitialiser les événements sur les nouveaux éléments dropdowns
function advancedSearch() {
	const tagInputs = document.querySelectorAll(".tag-element");
	initSearchByTag(tagInputs, searchByTag);
}

//gestion des dropdowns
function handleDropdown() {
	const tagButtons = document.querySelectorAll(".tag-select");
	openCloseDropdown(tagButtons);
}

// Déclencher la recherche par saisie input
function initSearchByNameInput() {
	const searchInput = document.getElementById("searchByName");
	const close = document.querySelector(".search-close");

	searchInput.addEventListener("keyup", (e) => {
		const query = e.target.value.trim().toLowerCase();
		if (query.length >= 3) {
			searchController.resetFilters();
			const filteredRecipes = searchController.search(query, "name");
			applyAllTagsFilters();
			displayRecipes(filteredRecipes);
			updateRecipeCount(filteredRecipes.length);
			updateFiltredDropdowns(filteredRecipes);
			advancedSearch();
			close.style.display = "block"; //afficher la croix
		} else if (query.length === 0) {
			resetSearch();
		}
	});

	close.addEventListener("click", (e) => {
		searchInput.value = ""; //vider l'input
		close.style.display = "none"; //masquer la croix
		displayRecipes(recipes);
		updateRecipeCount(recipes.length);
	});
}

// réinitialiser l'affichage des recettes à l'état initial
function resetSearch() {
	searchController.resetFilters();
	const filteredRecipes = searchController.filteredRecipes;
	displayRecipes(filteredRecipes);
	updateRecipeCount(filteredRecipes.length);
	applyAllTagsFilters();
	updateFiltredDropdowns(searchController.filteredRecipes);
}
function searchByTag(query, type) {
	// Vérifier si le tag n'est pas déjà sélectionné
	if (
		!selectedItemTags.some((tag) => tag.item === query && tag.type === type)
	) {
		selectedItemTags.push({ item: query, type: type });
		addTag(query, type);
		applyAllTagsFilters();

		advancedSearch();
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
	advancedSearch();
}

//appliquer tout les filtres de tags
function applyAllTagsFilters(filteredRecipes) {
	// Réinitialiser les recettes filtrées si aucune recette n'est passée en paramètre
	if (!filteredRecipes) {
		searchController.resetFilters();
		filteredRecipes = searchController.filteredRecipes;
	}

	// Appliquer les filtres pour chaque tag sélectionné
	selectedItemTags.forEach(({ item, type }) => {
		filteredRecipes = searchController.search(item, type);
	});

	// Afficher les résultats filtrés
	displayRecipes(filteredRecipes);
	updateRecipeCount(filteredRecipes.length);
	updateFiltredDropdowns(filteredRecipes);
}

//initier la recherche par input dans les tags
function searchByInputTags() {
	searchByInputTag("inputIngredient", "#ingredient-dropdown");
	searchByInputTag("inputAppliance", "#appliance-dropdown");
	searchByInputTag("inputUstensil", "#ustensil-dropdown");
}

init();
