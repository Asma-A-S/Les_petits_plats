//initier la recherche par tag et fermeture de la dropdown après le click
export function initSearchByTag(tagInputs, searchByTag) {
	tagInputs.forEach((tagInput) => {
		tagInput.addEventListener("click", (e) => {
			console.log(e.target, "e.target");
			console.log(tagInput, "taginput");
			const type = e.target.dataset.type;
			const query = e.target.textContent.trim().toLowerCase();
			if (query && type) {
				searchByTag(query, type);
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

			// Fermer tous les autres dropdowns avant d'en ouvrir un nouveau
			document
				.querySelectorAll(".dropdown-content.show")
				.forEach((dropdown) => {
					if (dropdown !== button.nextElementSibling) {
						dropdown.classList.remove("show");
						dropdown.previousElementSibling
							.querySelector(".vector-up")
							.classList.remove("rotate-180");
					}
				});

			const dropdownContent = button.nextElementSibling;
			dropdownContent.style.zIndex = "1";
			//toggle la visiblité de dropdown actuel
			dropdownContent.classList.toggle("show");

			// retourner la flèche de la liste déroulante
			const vectorIcon = button.querySelector(".vector-up");
			//retourner la flèche de la liste si la liste est ouverte
			if (dropdownContent.classList.contains("show")) {
				vectorIcon.classList.add("rotate-180");
			} else {
				vectorIcon.classList.remove("rotate-180");
			}
		});
	});
}

//gérer les inputs pour la recherche par tag
export function searchByInputTag(inputId, listId) {
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

export function resetDropdowns() {
	document.addEventListener("click", (e) => {
		// Vérifie si le clic n'est pas dans un bouton de sélection ou un menu déroulant
		if (
			!e.target.closest(".tag-select") &&
			!e.target.closest(".dropdown-content")
		) {
			// Ferme tous les dropdowns ouverts
			document
				.querySelectorAll(".dropdown-content.show")
				.forEach((dropdown) => {
					// Trouve le bouton associé pour fermer la flèche
					const button = dropdown.previousElementSibling;
					if (button && button.classList.contains("tag-select")) {
						const vectorIcon = button.querySelector(".vector-up");
						if (vectorIcon) {
							vectorIcon.classList.remove("rotate-180");
						}
					}

					// Ferme le dropdown
					dropdown.classList.remove("show");
				});
		}
	});
}

resetDropdowns();
