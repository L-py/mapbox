for i in ./city/*.geoJson;
do mv "$i" "${i%.geoJson}.json";
done