describe('Drag and Drop ингредиентов)', () => {
	beforeEach(() => {
		cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
			statusCode: 200,
			body: {
				success: true,
				data: [
					{
						_id: '123',
						name: 'Краторная булка',
						type: 'bun',
						proteins: 10,
						fat: 5,
						carbohydrates: 15,
						calories: 200,
						price: 100,
						image: 'https://code.s3.yandex.net/react/code/bun-02.png',
						image_mobile: '',
						image_large: '',
						__v: 0,
					},
					{
						_id: '456',
						name: 'Соус с шипами',
						type: 'sauce',
						proteins: 2,
						fat: 1,
						carbohydrates: 3,
						calories: 50,
						price: 20,
						image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
						image_mobile: '',
						image_large: '',
						__v: 0,
					},
				],
			},
		}).as('getIngredients');

		cy.visit('/');
		cy.wait('@getIngredients');
	});

	it('перетаскивает булку в контейнер для булок', () => {
		cy.get('[data-cy=ingredient-card]')
			.contains('Краторная булка')
			.then(($el) => {
				cy.get('[data-cy=drop-bun]').then(($dropTarget) => {
					cy.wrap($el).trigger('dragstart', { force: true });

					cy.wrap($dropTarget).trigger('drop', { force: true });

					cy.wrap($el).trigger('dragend', { force: true });
				});
			});

		cy.get('[data-cy=drop-bun]').contains('Краторная булка');
	});

	it('перетаскивает начинку в контейнер для начинок', () => {
		cy.get('[data-cy=ingredient-card]')
			.contains('Соус с шипами')
			.then(($el) => {
				cy.get('[data-cy=drop-ingredient]').then(($dropTarget) => {
					cy.wrap($el).trigger('dragstart', { force: true });

					cy.wrap($dropTarget).trigger('drop', { force: true });

					cy.wrap($el).trigger('dragend', { force: true });
				});
			});

		cy.get('[data-cy=drop-ingredient]').contains('Соус с шипами');
	});
});
