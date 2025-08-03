describe('Модалка ингредиента', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/ingredients', {
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

	it('открывает модалку при клике на первый ингредиент и закрывает при клике на иконку', () => {
		cy.get('[data-cy=ingredient-card]', { timeout: 5000 }).should(
			'have.length.greaterThan',
			0
		);

		cy.get('[data-cy=ingredient-card]').first().click();

		cy.get('[data-cy=modal]').should('exist');

		cy.contains('Детали ингредиента').should('exist');
		cy.contains('Краторная булка').should('exist');
		cy.get('[data-cy=modal] img').should('be.visible');
		cy.get('[data-cy=modal]').contains('Калории,ккал').should('exist');

		cy.get('[data-cy=modal-close-icon]').click();

		cy.get('[data-cy=modal]').should('not.exist');
	});

	it('открывает модалку при клике на второй ингредиент и закрывает при клике на оверлей', () => {
		cy.get('[data-cy=ingredient-card]', { timeout: 5000 }).should(
			'have.length.greaterThan',
			0
		);

		cy.get('[data-cy=ingredient-card]').eq(1).click();

		cy.get('[data-cy=modal]').should('exist');

		cy.contains('Детали ингредиента').should('exist');
		cy.contains('Соус с шипами').should('exist');
		cy.get('[data-cy=modal] img').should('be.visible');
		cy.get('[data-cy=modal]').contains('Белки, г').should('exist');

		cy.get('[data-cy=modal-close-overlay]').click({ force: true });

		cy.get('[data-cy=modal]').should('not.exist');
	});
});
