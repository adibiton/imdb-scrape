### imdb-scrape
scraping imdb using:
 - cheerio
 - axios
 - express
 
### Install
```sh
npm i
```

### Running on localhost
```sh
npm start
```
### API
scrape Movie metadata (name, release year, rating) 
> /scrape/imdb/getMoviesMetadata/:movieId

where ***movieId*** is the id on imdb (e.g. tt0059113)

result
``` 
{title: 'titanic', release: '1900', rating: '3.3'} 
```
#### License
[MIT](https://github.com/adibiton/imdb-scrape/blob/master/LICENSE)
