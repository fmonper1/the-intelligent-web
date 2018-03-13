# the-intelligent-web
Even better now

To import data from a seed use the following

```
mongoimport --db intelligentWeb --collection resturants --drop --jsonArray --file pathtoseed.json
```


JSON template for Restaurant data (resturant ;) )
```
{
    "name":"",
    "cuisine" : [
        ""
    ],
    "address" : {
        "streetName":"",
        "city":"",
        "postcode":"",
        "county":"",
        "country":""
    }
}
```
