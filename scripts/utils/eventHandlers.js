//initier la recherche par tag et fermeture de la dropdown après le click
export function initSearchByTag(tagInputs, searchByTag) {
	tagInputs.forEach((tagInput) => {
		tagInput.addEventListener("click", (e) => {
			const type = e.target.dataset.type;
			const query = e.target.textContent.trim().toLowerCase();
			if (query && type) {
				searchByTag(query, type);

				//refermer le dropdown après séléction du tag
				const dropdown = tagInput.closest(".dropdown-content");
				dropdown.classList.remove("show");
			}
		});
	});
}

//fermer le tag affiché
export function closeTag(tagContainer, removeTag) {
	tagContainer.addEventListener("click", (event) => {
		const button = event.target.closest(".remove-tag");
		if (button) {
			const query = button.dataset.item;
			const type = button.dataset.type;
			removeTag(query, type);
			button.closest(".tag-item").remove();
		}
	});
}

//gérer l'ouverture et la fermeture des dropdown
export function openCloseDropdown(tagButtons) {
	tagButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			e.preventDefault();
			const dropdownContent = button.nextElementSibling;
			dropdownContent.style.zIndex = "1";
			//toggle la visiblité de dropdown actuel
			dropdownContent.classList.toggle("show");

			//cacher les autres dropdown

			document.querySelectorAll(".dropdown-content").forEach((content) => {
				if (content !== dropdownContent) {
					content.classList.remove("show");
				}
			});
		});
	});
}

//gérer les inputs pour la recherche par tag
export function setupSearchFilter(inputId, listId) {
	const searchInput = document.getElementById(inputId);
	searchInput.addEventListener("input", () => {
		const searchTerm = searchInput.value.trim().toLowerCase();
		const listItems = document.querySelectorAll(listId + " li");
		listItems.forEach((item) => {
			const text = item.textContent.toLowerCase();
			item.style.display = text.includes(searchTerm) ? "block" : "none";
		});
	});
}
//fermer les dropdown si l'utilisateur clique en dehors des
export function resetDropdowns() {
	document.addEventListener("click", (e) => {
		if (!e.target.closest(".tag-select")) {
			document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
				dropdown.classList.remove("show");
			});
		}
	});
}
