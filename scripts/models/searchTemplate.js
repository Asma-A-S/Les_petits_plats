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
		const lowerQuery = query.toLowerCase();
		const result = [];

		for (let i = 0; i < this.recipes.length; i++) {
			const recipe = this.recipes[i];
			const recipeName = recipe.name.toLowerCase();
			const recipeDescription = recipe.description.toLowerCase();
			if (
				recipeName.includes(lowerQuery) ||
				recipeDescription.includes(lowerQuery)
			) {
				result.push(recipe);
				continue;
			}

			for (let j = 0; j < recipe.ingredients.length; j++) {
				const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
				if (ingredient.includes(lowerQuery)) {
					result.push(recipe);
					break;
				}
			}
		}
		return result;
	}
}

//recherche par ingrédient
export class FilterByIngredient extends SearchTemplate {
	filterRecipes(query) {
		const lowerCaseQuery = query.toLowerCase();
		const result = [];

		for (let i = 0; i < this.recipes.length; i++) {
			const recipe = this.recipes[i];
			for (let j = 0; j < recipe.ingredients.length; j++) {
				const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
				if (ingredient === lowerCaseQuery) {
					result.push(recipe);
					break; // Sortir de la boucle dès qu'un ingrédient correspond
				}
			}
		}
		return result;
	}
}

//recherche par appareil
export class FilterByAppliance extends SearchTemplate {
	constructor(recipes) {
		super(recipes);
	}
	filterRecipes(query) {
		const lowerCaseQuery = query.toLowerCase();
		const result = [];

		for (let i = 0; i < this.recipes.length; i++) {
			const recipe = this.recipes[i];
			if (recipe.appliance.toLowerCase() === lowerCaseQuery) {
				result.push(recipe);
			}
		}
		return result;
	}
}

// recherche par ustensil
export class FilterByUstensil extends SearchTemplate {
	constructor(recipes) {
		super(recipes);
	}
	filterRecipes(query) {
		const lowerCaseQuery = query.toLowerCase();
		const result = [];

		for (let i = 0; i < this.recipes.length; i++) {
			const recipe = this.recipes[i];
			for (let j = 0; j < recipe.ustensils.length; j++) {
				const ustensil = recipe.ustensils[j].toLowerCase();
				if (ustensil === lowerCaseQuery) {
					result.push(recipe);
					break; // Sortir de la boucle dès qu'un ustensil correspond
				}
			}
		}
		return result;
	}
}
