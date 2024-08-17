/// Template search, squellet de recherche
export class SearchTemplate {
	constructor(filteredRecipes) {
		this.recipes = filteredRecipes;
	}
	search(query) {
		return this.filterRecipes(query);
	}
}
// recherche principale
export class FilterByName extends SearchTemplate {
	filterRecipes(query) {
		const result = this.recipes.filter(
			(recipe) =>
				recipe.name.toLowerCase().includes(query.toLowerCase()) ||
				recipe.description.toLowerCase().includes(query.toLowerCase()) ||
				recipe.ingredients.some((ingredient) =>
					ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
				)
		);
		return result;
	}
}

//recherche par ingrédient
export class FilterByIngredient extends SearchTemplate {
	filterRecipes(query) {
		const result = this.recipes.filter((recipe) =>
			recipe.ingredients.some(
				(ingredient) =>
					ingredient.ingredient.toLowerCase() === query.toLowerCase()
			)
		);
		return result;
	}
}

//recherche par appareil
export class FilterByAppliance extends SearchTemplate {
	constructor(recipes) {
		super(recipes);
	}
	filterRecipes(query) {
		const result = this.recipes.filter(
			(recipe) => recipe.appliance.toLowerCase() === query.toLowerCase()
		);
		return result;
	}
}

// recherche par ustensil
export class FilterByUstensil extends SearchTemplate {
	constructor(recipes) {
		super(recipes);
	}
	filterRecipes(query) {
		const result = this.recipes.filter((recipe) =>
			recipe.ustensils.some(
				(ustensil) => ustensil.toLowerCase() === query.toLowerCase()
			)
		);
		return result;
	}
}
