<script lang="ts">
	let dailyCalories = 2200;
	let consumedCalories = 1450;
	let remainingCalories = dailyCalories - consumedCalories;

	let meals = [
		{ name: 'Breakfast', calories: 420, protein: 22, carbs: 45, fat: 12 },
		{ name: 'Lunch', calories: 680, protein: 35, carbs: 65, fat: 20 },
		{ name: 'Snack', calories: 350, protein: 15, carbs: 25, fat: 8 }
	];

	let macros = {
		protein: {
			target: 150,
			current: meals.reduce((sum, meal) => sum + meal.protein, 0),
			unit: 'g'
		},
		carbs: {
			target: 250,
			current: meals.reduce((sum, meal) => sum + meal.carbs, 0),
			unit: 'g'
		},
		fat: {
			target: 70,
			current: meals.reduce((sum, meal) => sum + meal.fat, 0),
			unit: 'g'
		}
	};

	function getPercentage(current, target) {
		return Math.min(Math.round((current / target) * 100), 100);
	}

	function getCaloriePercentage() {
		return Math.min(Math.round((consumedCalories / dailyCalories) * 100), 100);
	}
</script>

<div class="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
	<h2 class="mb-4 text-xl font-bold">Nutrition Tracker</h2>

	<div class="mb-6">
		<div class="mb-2 flex justify-between">
			<span class="text-sm text-gray-400">Daily Calories</span>
			<span class="text-sm">
				<span class="font-medium">{consumedCalories}</span> / {dailyCalories} kcal
			</span>
		</div>
		<div class="h-3 w-full overflow-hidden rounded-full bg-gray-700">
			<div class="h-3 rounded-full bg-green-500" style="width: {getCaloriePercentage()}%"></div>
		</div>
		<div class="mt-1 text-right text-xs text-gray-400">
			{remainingCalories} kcal remaining
		</div>
	</div>

	<div class="mb-6 grid grid-cols-3 gap-4">
		<div class="rounded-lg bg-gray-700 p-3 text-center">
			<div class="mb-1 text-xs text-gray-400">Protein</div>
			<div class="mb-2 text-lg font-medium">
				{macros.protein.current}/{macros.protein.target}{macros.protein.unit}
			</div>
			<div class="h-1 w-full overflow-hidden rounded-full bg-gray-600">
				<div
					class="h-1 rounded-full bg-blue-500"
					style="width: {getPercentage(macros.protein.current, macros.protein.target)}%"
				></div>
			</div>
		</div>
		<div class="rounded-lg bg-gray-700 p-3 text-center">
			<div class="mb-1 text-xs text-gray-400">Carbs</div>
			<div class="mb-2 text-lg font-medium">
				{macros.carbs.current}/{macros.carbs.target}{macros.carbs.unit}
			</div>
			<div class="h-1 w-full overflow-hidden rounded-full bg-gray-600">
				<div
					class="h-1 rounded-full bg-yellow-500"
					style="width: {getPercentage(macros.carbs.current, macros.carbs.target)}%"
				></div>
			</div>
		</div>
		<div class="rounded-lg bg-gray-700 p-3 text-center">
			<div class="mb-1 text-xs text-gray-400">Fat</div>
			<div class="mb-2 text-lg font-medium">
				{macros.fat.current}/{macros.fat.target}{macros.fat.unit}
			</div>
			<div class="h-1 w-full overflow-hidden rounded-full bg-gray-600">
				<div
					class="h-1 rounded-full bg-red-500"
					style="width: {getPercentage(macros.fat.current, macros.fat.target)}%"
				></div>
			</div>
		</div>
	</div>

	<h3 class="mb-2 text-lg font-medium">Today's Meals</h3>
	<div class="mb-4 max-h-48 overflow-y-auto">
		{#each meals as meal}
			<div class="mb-2 rounded-lg border border-gray-700 p-3">
				<div class="flex justify-between">
					<span class="font-medium">{meal.name}</span>
					<span class="text-gray-400">{meal.calories} kcal</span>
				</div>
				<div class="mt-1 flex text-xs text-gray-400">
					<span class="mr-3">P: {meal.protein}g</span>
					<span class="mr-3">C: {meal.carbs}g</span>
					<span>F: {meal.fat}g</span>
				</div>
			</div>
		{/each}
	</div>

	<button class="w-full rounded bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700">
		Log New Meal
	</button>
</div>
