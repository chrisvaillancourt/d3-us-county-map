import { feature, } from 'topojson';
import { json, } from 'd3';

export const loadAndProcessData = () => json(`https://raw.githubusercontent.com/chrisvaillancourt/geo-data/master/school-home-retire/cy-simplified.topojson`)
  .then(topoJsonData => {
    const geoData = feature(topoJsonData, topoJsonData.objects.cy);
    return geoData;
  });
