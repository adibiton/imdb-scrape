### scrape-imdb
scraping imdb using:
 - cheerio
 - axios
 - express
 
### Install
```sh
npm i
```
### API
scrape Movie metadata (name, release year, rating) 
> http://localhost:<port>/scrape/imdb/movies/movieId?

where ***movieId*** is the id on imdb (e.g. tt0059113)

result
``` 
{title: 'titanic', release: '1900', rating: '3.3'} 
```
#### License
MIT
