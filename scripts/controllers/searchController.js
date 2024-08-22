import {
	FilterByName,
	FilterByAppliance,
	FilterByIngredient,
	FilterByUstensil,
} from "../models/searchTemplate.js";

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
