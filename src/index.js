import { 
  select,
  geoPath,
  geoAlbersUsa,
  scaleSequential,
  min,
  max,
  interpolateGnBu,
  zoom,
  event,
} from 'd3';

import { loadAndProcessData, } from './modules/loadAndProcessData';

const width = 960;
const height = 500;

const svg = select(`body`)
    .append(`svg`)
    .attr(`width`, width)
    .attr(`height`, height);

const g = svg.append(`g`);

const colorValue = d => d.properties[`Index: May start/return to school in next 12 mo`];
const colorRamp = interpolateGnBu;

const projection = geoAlbersUsa();
const pathGenerator = geoPath().projection(projection);

svg.call(zoom().on(`zoom`, () => {
  g.attr(`transform`, event.transform);
}));

loadAndProcessData()
    .then(geoData => {

    const minVal = min(geoData, colorValue);
    const maxVal = max(geoData, colorValue);

    const colorScale = scaleSequential();

    colorScale.domain([minVal, maxVal,]).interpolator(colorRamp);

    g
      .attr(`class`, `counties`)
      .selectAll(`path`)
      .data(geoData)
      .enter()
      .append(`path`)
      .attr(`fill`, d => colorScale(d.properties[`Index: May start/return to school in next 12 mo`]))
      .attr(`d`, pathGenerator);

    });