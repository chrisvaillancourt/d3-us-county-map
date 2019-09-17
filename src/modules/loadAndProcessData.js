import { feature, } from 'topojson';
import { json, } from 'd3';

const dataURL = `https://raw.githubusercontent.com/chrisvaillancourt/geo-data/master/school-home-retire/cy-simplified-1.topojson`;

export const loadAndProcessData = () => json(dataURL)
  .then(topoJsonData => {
    const geoData = feature(topoJsonData, topoJsonData.objects.cy).features;
    return geoData;
  });
