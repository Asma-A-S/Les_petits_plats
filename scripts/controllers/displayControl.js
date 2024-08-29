import { DropdownData } from "../models/dropdownModel.js";
import { createRecipeCardDom } from "../models/recipeTemplate.js";

// afficher les recettes
export function displayRecipes(recipes) {
	const container = document.querySelector(".container-card");
	container.innerHTML = "";

	recipes.forEach((recipe) => {
		const card = createRecipeCardDom(recipe);
		container.appendChild(card);
	});
}

//mettre à jour le nombre de recettes affichées
export function updateRecipeCount(count) {
	if (count === 0) {
		const noResult = document.getElementById("noResultsMessage");
		noResult.style.display = "flex";
	}
	count = count.toString().padStart(2, "0");
	const recipeCountElement = document.getElementById("recipeCount");
	recipeCountElement.textContent = `${count} recettes`;
}

//rcéupérer et afficher les  listes ingredients ustensil et appliance
export function getIngredientUstensilApplianceLists(dropdownData) {
	displayDropdownLists(
		"ingredient-dropdown",
		dropdownData.ingredients,
		"ingredient"
	);
	displayDropdownLists(
		"appliance-dropdown",
		dropdownData.appliances,
		"appliance"
	);
	displayDropdownLists("ustensil-dropdown", dropdownData.ustensils, "ustensil");
}

// Mise à jour des listes déroulantes
export function updateFiltredDropdowns(recipes) {
	const dropdownData = new DropdownData(); //instance
	dropdownData.setTagsLists(recipes);
	const updatedDropdownLists = dropdownData.returnedDropdownLists();
	getIngredientUstensilApplianceLists(updatedDropdownLists);
}

//squelette pour afficher les listes déroulantes
export function displayDropdownLists(dropdownId, items, type) {
	const dropdown = document.getElementById(dropdownId);
	if (dropdown) {
		dropdown.innerHTML = ""; // Efface les anciens éléments de la liste déroulante

		items.forEach((item) => {
			const li = document.createElement("li");
			li.classList.add("dropdown-item", "tag-element");
			li.textContent = item;
			li.setAttribute("data-type", type);
			dropdown.appendChild(li);
		});
	}
}
