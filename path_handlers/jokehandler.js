'use strict';

const hstatus = require('hapi-status'); //HTTP Status codes 
const async = require('async');
const axios = require("axios");

module.exports = {
    /*Read all categories*/
    readCategories: function (request, reply) {
        console.log("Call initiated : ");
        var retObj = {

        };

        async.parallel([

            function (callback) {

                readCategories().then(requestResponse => {
                    console.log("==Response==");
                    console.log(requestResponse.result.data)
                    if (requestResponse != "Error") {
                        retObj.response = requestResponse.result.data;
                        callback(null, retObj)

                    } else {

                        retObj.response = "An unexpected error occured";
                        callback(null, retObj)
                    }
                })


            }
        ],
            function (err, results) {

                var reqResponse = {
                    'body': retObj,
                    'details': 'success'
                };
                return hstatus.ok(reply, reqResponse);
            });

    },
    /*Gate a random joke*/
    resolveRandomJoke: function (request, reply) {

        console.log("Call initiated : ", request.payload.category);
        var retObj = {

        };

        async.parallel([

            function (callback) {

                getRandomJoke(request.payload.category).then(requestResponse => {
                    console.log("==Response Joke Random==");
                    console.log(requestResponse.result.data)
                    if (requestResponse != "Error") {
                        if (requestResponse.result.data) {

                            /*Valid category has been passed*/
                            retObj.response = requestResponse.result.data;
                            callback(null, retObj)

                           

                        } else {

                             /*In case of an invalid category*/
                             console.log("No jokes for category "+request.payload.category);
                             retObj.response = "No jokes for category "+request.payload.category;
                             callback(null, retObj);
                            
                        }


                    } else {

                        retObj.response = "An unexpected error occured";
                        callback(null, retObj)
                    }
                })


            }
        ],
            function (err, results) {

                var reqResponse = {
                    'body': retObj,
                    'details': 'success'
                };
                return hstatus.ok(reply, reqResponse);
            });

    }





}

/*get all categories from Chuck norries API*/

function readCategories() {

    return new Promise((resolve, reject) => {

        axios.get('https://api.chucknorris.io/jokes/categories')
            .then(serverResponse => {

                resolve({ result: serverResponse });

            })
            .catch(error => {

                console.log(error);
                resolve({ result: "Error" });

            })


    });

}



/*get a Joke by a category from Chuck norries API*/

function getRandomJoke(category) {

    return new Promise((resolve, reject) => {

        axios.get('https://api.chucknorris.io/jokes/random?category=' + category)
            .then(serverResponse => {

                resolve({ result: serverResponse });

            })
            .catch(error => {

                console.log(error);
                resolve({ result: "Error" });

            })


    });

}




