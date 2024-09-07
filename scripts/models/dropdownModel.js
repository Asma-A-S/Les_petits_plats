export class DropdownData {
	constructor() {
		this.ingredients = [];
		this.appliances = [];
		this.ustensils = [];
	}
	// unique item per list ingrdient, ustensil, appliance
	setTagsLists(recipes) {
		const ingredientsSet = new Set();
		const appliancesSet = new Set();
		const ustensilsSet = new Set();

		for (let i = 0; i < recipes.length; i++) {
			const recipe = recipes[i];

			for (let j = 0; j < recipe.ingredients.length; j++) {
				const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
				ingredientsSet.add(ingredient);
			}

			appliancesSet.add(recipe.appliance.toLowerCase());

			for (let k = 0; k < recipe.ustensils.length; k++) {
				const ustensil = recipe.ustensils[k].toLowerCase();
				ustensilsSet.add(ustensil);
			}
		}

		this.ingredients = Array.from(ingredientsSet).sort();
		this.appliances = Array.from(appliancesSet).sort();
		this.ustensils = Array.from(ustensilsSet).sort();
	}
	// retourner les listes ingredients, ustensils, appliance
	returnedDropdownLists() {
		return {
			ingredients: this.ingredients,
			appliances: this.appliances,
			ustensils: this.ustensils,
		};
	}
}
