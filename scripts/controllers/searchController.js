import {
	FilterByName,
	FilterByAppliance,
	FilterByIngredient,
	FilterByUstensil,
} from "../models/searchTemplate.js";
/*
export class SearchController {
	constructor(recipes) {
		this.originalRecipes = recipes;
		this.filteredRecipes = [...this.originalRecipes];
	}
	resetFilters() {
		this.filteredRecipes = [...this.originalRecipes];
	}
	// methode pour la recherche avancée
	search(query, type = "name") {
		switch (type) {
			case "name":
				this.filteredRecipes = new FilterByName(this.filteredRecipes).search(
					query
				);
				break;
			case "ingredient":
				this.filteredRecipes = new FilterByIngredient(
					this.filteredRecipes
				).search(query);
				break;
			case "appliance":
				this.filteredRecipes = new FilterByAppliance(
					this.filteredRecipes
				).search(query);
				break;
			case "ustensil":
				this.filteredRecipes = new FilterByUstensil(
					this.filteredRecipes
				).search(query);
				break;
			default:
				console.warn(`Type de recherche inconnu : ${type}`);
				return this.filteredRecipes;
		}
		return this.filteredRecipes;
	}
}
*/
export class SearchController {
	constructor(recipes) {
		this.originalRecipes = recipes; // Liste complète des recettes
		this.resetFilters();
	}

	resetFilters() {
		// Réinitialise uniquement les résultats filtrés par tags, pas par nom
		this.nameFilteredRecipes = [...this.originalRecipes];
		this.filteredRecipes = [...this.originalRecipes];
	}

	// Méthode pour la recherche par nom
	searchByName(query) {
		this.nameFilteredRecipes = new FilterByName(this.originalRecipes).search(
			query
		);
		this.filteredRecipes = [...this.nameFilteredRecipes]; // Initialiser le filtre par tags avec les résultats par nom
		return this.filteredRecipes;
	}

	// Méthode pour la recherche avancée par tags
	searchByTag(query, type) {
		switch (type) {
			case "ingredient":
				this.filteredRecipes = new FilterByIngredient(
					this.filteredRecipes
				).search(query);
				break;
			case "appliance":
				this.filteredRecipes = new FilterByAppliance(
					this.filteredRecipes
				).search(query);
				break;
			case "ustensil":
				this.filteredRecipes = new FilterByUstensil(
					this.filteredRecipes
				).search(query);
				break;
			default:
				console.warn(`Type de recherche inconnu : ${type}`);
		}
		return this.filteredRecipes;
	}
}
