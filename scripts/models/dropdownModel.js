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

		recipes.forEach((recipe) => {
			recipe.ingredients.forEach((ingredient) =>
				ingredientsSet.add(ingredient.ingredient.toLowerCase())
			);
			appliancesSet.add(recipe.appliance.toLowerCase());
			recipe.ustensils.forEach((ustensil) =>
				ustensilsSet.add(ustensil.toLowerCase())
			);
		});

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
