## node 

Using this [tutorial](https://medium.com/@bretcameron/mongodb-a-beginners-guide-8fca0c7787a4)

### Using cloud mongo DB: [Mongo DB](https://cloud.mongodb.com) 
mongodb+srv://testy-mc-test:12345@cluster0-8gv6v.mongodb.net/test?retryWrites=true&w=majority

```
$ npm install express --save
$ npm install -g express-generator
```
Installs express-generator globally 
See [here](http://expressjs.com/en/starter/generator.html)
```
$ npm init
$ npm install mongodb --save 
$ npm install ejs --save
$ npm install mongoose-currency --save //allows us to use type: Currency
$ npm install morgan
$ npm install cookie-parser
$ npm install body-parser
```


To get to the mongo REPL
```
$ C:\Program Files\MongoDB\Server\4.0\bin\
$ mongo
 
$ use conFusion 	//create DB if not there or use if there
$ db   //check db name
$ db.help();
$ db.dishes		create or use a collection called 
$ db.dishes.insert({"name": "pizza", "description": "Test"});
$ db.dishes.find();
$ db.dishes.find().pretty();
$ var id = new ObjectId();
$ id.getTimestamp();		//returns ISO date from _id
$ exit 	//to exit the REPL
```
To open a cmp prompt in current folder: When inside the folder in explorer, shift and right-click
Gitignore file [info here](https://stackoverflow.com/questions/10744305/how-to-create-gitignore-file)


