export class DropdownData {
	constructor() {
		this.ingrdeients = [];
		this.appliances = [];
		this.ustensils = [];
	}
	// unique item per list ingrdient, ustensil, appliance
	updateLists(recipes) {
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

		this.ingredients = Array.from(ingredientsSet);
		this.appliances = Array.from(appliancesSet);
		this.ustensils = Array.from(ustensilsSet);
	}

	getDropDownLists() {
		return {
			ingredients: this.ingredients,
			appliances: this.appliances,
			ustensils: this.ustensils,
		};
	}
}
