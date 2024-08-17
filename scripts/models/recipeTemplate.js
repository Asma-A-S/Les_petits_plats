export function createRecipeCardDom(recipe) {
	const article = document.createElement("article");
	article.classList.add("recipe-card");

	// Time span
	const timeSpan = document.createElement("span");
	timeSpan.classList.add("recipe-card-time");
	const timeParagraph = document.createElement("p");
	timeParagraph.classList.add("time");
	timeParagraph.textContent = `${recipe.time} min`;
	timeSpan.appendChild(timeParagraph);

	// Image
	const image = document.createElement("img");
	image.classList.add("recipe-card-img");
	image.src = `assets/images/${recipe.image}`;
	image.alt = "Photo du plat";

	// Recipe info container
	const infoContainer = document.createElement("div");
	infoContainer.classList.add("recipe-card-info");

	// Recipe name
	const recipeName = document.createElement("h2");
	recipeName.classList.add("recipe-card-name");
	recipeName.textContent = recipe.name;

	// Recipe block
	const recipeBlock = document.createElement("div");
	recipeBlock.classList.add("recipe-info-block");

	const recipeTitle = document.createElement("h3");
	recipeTitle.textContent = "RECETTE";

	const recipeDescription = document.createElement("p");
	recipeDescription.classList.add("recipe-card-description");
	recipeDescription.textContent = recipe.description;

	recipeBlock.appendChild(recipeTitle);
	recipeBlock.appendChild(recipeDescription);

	// Ingredients block
	const ingredientsBlock = document.createElement("div");
	ingredientsBlock.classList.add("recipe-info-block");

	const ingredientsTitle = document.createElement("h3");
	ingredientsTitle.textContent = "INGRÉDIENTS";

	const ingredientsList = document.createElement("ul");
	ingredientsList.classList.add("recipe-card-ingredients");

	recipe.ingredients.forEach((ingredient) => {
		const listItem = document.createElement("li");

		const ingredientName = document.createElement("p");
		ingredientName.classList.add("recipe-ingredient");
		ingredientName.textContent = ingredient.ingredient;

		const ingredientQuantity = document.createElement("span");
		ingredientQuantity.classList.add("recipe-quantity");
		ingredientQuantity.textContent = ingredient.quantity
			? ingredient.unit
				? `${ingredient.quantity} ${ingredient.unit}`
				: `${ingredient.quantity}`
			: "-";

		listItem.appendChild(ingredientName);
		listItem.appendChild(ingredientQuantity);
		ingredientsList.appendChild(listItem);
	});

	ingredientsBlock.appendChild(ingredientsTitle);
	ingredientsBlock.appendChild(ingredientsList);

	// Append all to the info container
	infoContainer.appendChild(recipeName);
	infoContainer.appendChild(recipeBlock);
	infoContainer.appendChild(ingredientsBlock);

	// Append all to the article
	article.appendChild(timeSpan);
	article.appendChild(image);
	article.appendChild(infoContainer);

	return article;
}
