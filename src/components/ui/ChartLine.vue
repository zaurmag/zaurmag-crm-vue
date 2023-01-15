<template>
	<Line
		:chart-data="chartData"
		:chart-options="chartOptions"
		:chart-id="chartId"
		:dataset-id-key="datasetIdKey"
		:plugins="plugins"
		:css-classes="cssClasses"
		:styles="styles"
		:width="width"
		:height="height"
	/>
</template>

<script>
import { Line } from 'vue-chartjs'
import 'chart.js/auto'

export default {
	name: 'ChartLine',
	components: {
		Line,
	},
	props: {
		chartData: {
			type: Object,
			required: true,
		},
		chartOptions: {
			type: Object,
			default: () => {
				return {
					responsive: true,
				}
			},
		},
		chartId: {
			type: String,
			default: 'line-chart',
		},
		datasetIdKey: {
			type: String,
			default: 'label',
		},
		width: {
			type: Number,
			default: 400,
		},
		height: {
			type: Number,
			default: 400,
		},
		cssClasses: {
			default: '',
			type: String,
		},
		styles: {
			type: Object,
			default: () => {},
		},
		plugins: {
			type: Object,
			default: () => {},
		},
	},
}
</script>

<style scoped></style>
