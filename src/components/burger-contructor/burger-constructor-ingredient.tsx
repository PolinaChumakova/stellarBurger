import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient, TIngredientWithIndex } from '@utils/types.ts';
import { sortBurgerConstructor } from '../services/actions';
import { useDispatch } from '@/utils/hooks';

interface IBurgerConstructorIngredientProps {
	ingredient: TIngredient;
	handleDeleteIngredient: (id: string) => void;
	index: number;
}

export const BurgerConstructorIngredient: FC<
	IBurgerConstructorIngredientProps
> = ({ ingredient, handleDeleteIngredient, index }) => {
	const dispatch = useDispatch();

	const dropRefCurrentIng = useRef<HTMLDivElement>(null);
	const [, drop] = useDrop<
		TIngredientWithIndex,
		void,
		{ handlerId: Identifier | null }
	>({
		accept: 'ingredients',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: TIngredientWithIndex, monitor) {
			if (!dropRefCurrentIng.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect =
				dropRefCurrentIng.current?.getBoundingClientRect();

			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			const clientOffset = monitor.getClientOffset();
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			dispatch(sortBurgerConstructor(dragIndex, hoverIndex));
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'ingredients',

		item: { ...ingredient, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(dropRefCurrentIng));

	const opacity = isDragging ? 0 : 1;

	return (
		<div
			ref={dropRefCurrentIng}
			style={{ opacity }}
			className={styles.burgerIngredient}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={() => handleDeleteIngredient(ingredient.uniqueId)}
			/>
		</div>
	);
};
