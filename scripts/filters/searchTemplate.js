import {
	displayRecipes,
	updateRecipeCount,
} from "../components/recipeTemplate";
export class SearchTemplate {
	constructor(recipes) {
		this.recipes = recipes;
	}
	search(query) {
		throw new Error("Method 'search' must be implemented");
	}
	displayRecipes(recipes) {
		displayRecipes(recipes);
		updateRecipeCount(recipes.length);
	}
}

export class FilterByName extends SearchTemplate {
	search(query) {
		const filteredRecipes = this.recipes.filter(
			(recipe) =>
				recipe.name.toLowerCase().includes(query.toLowerCase()) ||
				recipe.description.toLowerCase().includes(query.toLowerCase()) ||
				recipe.ingredients.some((ingredient) =>
					ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
				)
		);
		this.displayRecipes(filteredRecipes);
		return filteredRecipes;
	}
}
export class FilterByIngredient extends SearchTemplate {
	search(query) {
		const filteredRecipes = this.recipes.filter((recipe) =>
			recipe.ingredients.some(
				(ingredient) =>
					ingredient.ingredient.toLowerCase() === query.toLowerCase()
			)
		);
		this.displayRecipes(filteredRecipes);
		return filteredRecipes;
	}
}

export class FilterByAppliance extends SearchTemplate {
	search(query) {
		const filteredRecipes = this.recipes.filter(
			(recipe) => recipe.appliance.toLowerCase() === query.toLowerCase()
		);
		this.displayRecipes(filteredRecipes);
		return filteredRecipes;
	}
}
export class FilterByUstensil extends SearchTemplate {
	search(query) {
		const filteredRecipes = this.recipes.filter((recipe) =>
			recipe.ustensils.some(
				(ustensil) => ustensil.toLowerCase() === query.toLowerCase()
			)
		);
		this.displayRecipes(filteredRecipes);
		return filteredRecipes;
	}
}
