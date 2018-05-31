/**
 * Created by Tia on 22/05/17.
 */
/*Join a group
Let the current user join a given group using OAuth. You'll need to register your app (required).
URL: http://www.goodreads.com/group/join?format=xml&id=GROUP_ID
    HTTP method: POST
Parameters:
    id: id of the group (required)
format: xml (required)
*/


/**
 * Created by Tia on 12/05/17.
 */


/*Get the books on a members shelf
 Get the books on a members shelf. Customize the feed with the below variables. Viewing members with profiles who have set them as visible to members only or just their friends requires using OAuth.
 URL: https://www.goodreads.com/review/list?v=2    (sample url)
 HTTP method: GET
 Parameters:
 v: 2
 id: Goodreads id of the user
 shelf: read, currently-reading, to-read, etc. (optional)
 sort: title, author, cover, rating, year_pub, date_pub, date_pub_edition, date_started, date_read, date_updated, date_added, recommender, avg_rating, num_ratings, review, read_count, votes, random, comments, notes, isbn, isbn13, asin, num_pages, format, position, shelves, owned, date_purchased, purchase_location, condition (optional)
 search[query]: query text to match against member's books (optional)
 order: a, d (optional)
 page: 1-N (optional)
 per_page: 1-200 (optional)
 key: Developer key (required).

 */


















// Use this instead: ...........  Get the books on a members shelf
//https://www.goodreads.com/review/list/67589234.xml?key=PsiDYifchcrF6dDwoZUDw&v=2


///example url from GoodReads
// "https://www.goodreads.com/search.xml?key=YOUR_KEY&q=Ender%27s+Game"


//example url for searching groups of a certain category
//https://www.goodreads.com/group/search.xml?key=PsiDYifchcrF6dDwoZUDw&q=romance


//https://www.goodreads.com/review/list/67589234.xml?key=PsiDYifchcrF6dDwoZUDw&v=2





//listens and waits for the DOM content to be loaded before calling the bindButtons function.
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {

    //adds a listener to the GetMembersShelfSubmit button for when it is clicked.
    // When it is clicked, the function(input) is called.
    document.getElementById('GetMembersShelfSubmit').addEventListener('click', function(input){

        //the example url provided by GoodReads
        //https://www.goodreads.com/group/search.xml?key=PsiDYifchcrF6dDwoZUDw&q=adventure
        //https://www.goodreads.com/group/search/.xmlq=

        //notes the url that we want to get the data from
        var url = "https://www.goodreads.com/group/search.xml";

        //creates a new XMlHTTPRequest
        var Request = new XMLHttpRequest();

        //sets the API Key and its framework through which our interaction with GoodReads is allowed and monitored
        var APIKey = "?key=" + "PsiDYifchcrF6dDwoZUDw&";


        //gets the user whose shelf you want to find
        var QueryString = document.getElementById("IDOfGroup").value;
        var QueryStringComplete=  "q=" + QueryString;


        //creates the url to request the information from GoodReads
        var URLToRequestInfo = url +  APIKey + QueryStringComplete;

        //open the request to get the information from the url
        //send "true" as the third argument, making this an asynchronous request.
        //Note: an asynchronous request is one where our program can continue,
        // and the browser will take care of the sending and receiving of data
        // in the background.
        Request.open("GET", URLToRequestInfo, true);

        //since this is an asynchronous request, we need to create a listener
        //that lets us know when the request returns (or has loaded).
        Request.addEventListener('load', function() {

            //if the request was successful, then change the xml to json using the
            // xmlToJSON function from below. After this, put it into
            //the ReturnedInfo function.
            //Note that a request is considered successful if the status returned
            //is between 200 and less than 400.
            if (Request.status >= 200 && Request.status < 400) {
                var Response = xmlToJSON.parseString(Request.responseText);
                ReturnedInfo(Response);
            } else { //else, there was an error. Let the user know by creating an
                //alert that tells them the request to open GoodReads was unsuccesful.
                var ErrorText = "Error in network request: " + Response.statusText;
                alert(ErrorText);
            }
        });

        //sends the request to GoodReads
        Request.send();

        // We call preventDefault on the event (called input) so we refresh the page
        // and cause the browser to lose all of the information. That would
        // break everything.
        input.preventDefault();
    });

}


///Post to OARTH
/*https://oauth2server.com/auth?response_type=code&
    client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=photos&state=1234zyx*/

//put all of the returned GoodReads info into the html elements by their id.
/*function ReturnedInfo(Response) {


    //note, you can go through the books by changing review
    document.getElementById('FirstGroupTitle').textContent = Response.GoodreadsResponse[0].groups[0].list[0].group[0].title[0]._text;
    document.getElementById('FirstGroupCount').textContent = Response.GoodreadsResponse[0].groups[0].list[0].group[0].users_count[0]._text;


    document.getElementById('SecondGroupTitle').textContent = Response.GoodreadsResponse[0].groups[0].list[0].group[1].title[0]._text;
    document.getElementById('SecondGroupCount').textContent = Response.GoodreadsResponse[0].groups[0].list[0].group[1].users_count[0]._text;


    document.getElementById('ThirdGroupTitle').textContent = Response.GoodreadsResponse[0].groups[0].list[0].group[2].title[0]._text;
    document.getElementById('ThirdGroupCount').textContent = Response.GoodreadsResponse[0].groups[0].list[0].group[2].users_count[0]._text;


    document.getElementById('FourthGroupTitle').textContent = Response.GoodreadsResponse[0].groups[0].list[0].group[3].title[0]._text;
    document.getElementById('FourthGroupCount').textContent = Response.GoodreadsResponse[0].groups[0].list[0].group[3].users_count[0]._text;


    document.getElementById('FifthGroupTitle').textContent = Response.GoodreadsResponse[0].groups[0].list[0].group[4].title[0]._text;
    document.getElementById('FifthGroupCount').textContent = Response.GoodreadsResponse[0].groups[0].list[0].group[4].users_count[0]._text;

}*/

/****************************/
var xmlToJSON = (function () {

    this.version = "1.3";

    var options = { // set up the default options
        mergeCDATA: true, // extract cdata and merge with text
        grokAttr: true, // convert truthy attributes to boolean, etc
        grokText: true, // convert truthy text/attr to boolean, etc
        normalize: true, // collapse multiple spaces to single space
        xmlns: true, // include namespaces as attribute in output
        namespaceKey: '_ns', // tag name for namespace objects
        textKey: '_text', // tag name for text nodes
        valueKey: '_value', // tag name for attribute values
        attrKey: '_attr', // tag for attr groups
        cdataKey: '_cdata', // tag for cdata nodes (ignored if mergeCDATA is true)
        attrsAsObject: true, // if false, key is used as prefix to name, set prefix to '' to merge children and attrs.
        stripAttrPrefix: true, // remove namespace prefixes from attributes
        stripElemPrefix: true, // for elements of same name in diff namespaces, you can enable namespaces and access the nskey property
        childrenAsArray: true // force children into arrays
    };

    var prefixMatch = new RegExp(/(?!xmlns)^.*:/);
    var trimMatch = new RegExp(/^\s+|\s+$/g);

    this.grokType = function (sValue) {
        if (/^\s*$/.test(sValue)) {
            return null;
        }
        if (/^(?:true|false)$/i.test(sValue)) {
            return sValue.toLowerCase() === "true";
        }
        if (isFinite(sValue)) {
            return parseFloat(sValue);
        }
        return sValue;
    };

    this.parseString = function (xmlString, opt) {
        return this.parseXML(this.stringToXML(xmlString), opt);
    }

    this.parseXML = function (oXMLParent, opt) {

        // initialize options
        for (var key in opt) {
            options[key] = opt[key];
        }

        var vResult = {},
            nLength = 0,
            sCollectedTxt = "";

        // parse namespace information
        if (options.xmlns && oXMLParent.namespaceURI) {
            vResult[options.namespaceKey] = oXMLParent.namespaceURI;
        }

        // parse attributes
        // using attributes property instead of hasAttributes method to support older browsers
        if (oXMLParent.attributes && oXMLParent.attributes.length > 0) {
            var vAttribs = {};

            for (nLength; nLength < oXMLParent.attributes.length; nLength++) {
                var oAttrib = oXMLParent.attributes.item(nLength);
                vContent = {};
                var attribName = '';

                if (options.stripAttrPrefix) {
                    attribName = oAttrib.name.replace(prefixMatch, '');

                } else {
                    attribName = oAttrib.name;
                }

                if (options.grokAttr) {
                    vContent[options.valueKey] = this.grokType(oAttrib.value.replace(trimMatch, ''));
                } else {
                    vContent[options.valueKey] = oAttrib.value.replace(trimMatch, '');
                }

                if (options.xmlns && oAttrib.namespaceURI) {
                    vContent[options.namespaceKey] = oAttrib.namespaceURI;
                }

                if (options.attrsAsObject) { // attributes with same local name must enable prefixes
                    vAttribs[attribName] = vContent;
                } else {
                    vResult[options.attrKey + attribName] = vContent;
                }
            }

            if (options.attrsAsObject) {
                vResult[options.attrKey] = vAttribs;
            } else {}
        }

        // iterate over the children
        if (oXMLParent.hasChildNodes()) {
            for (var oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
                oNode = oXMLParent.childNodes.item(nItem);

                if (oNode.nodeType === 4) {
                    if (options.mergeCDATA) {
                        sCollectedTxt += oNode.nodeValue;
                    } else {
                        if (vResult.hasOwnProperty(options.cdataKey)) {
                            if (vResult[options.cdataKey].constructor !== Array) {
                                vResult[options.cdataKey] = [vResult[options.cdataKey]];
                            }
                            vResult[options.cdataKey].push(oNode.nodeValue);

                        } else {
                            if (options.childrenAsArray) {
                                vResult[options.cdataKey] = [];
                                vResult[options.cdataKey].push(oNode.nodeValue);
                            } else {
                                vResult[options.cdataKey] = oNode.nodeValue;
                            }
                        }
                    }
                } /* nodeType is "CDATASection" (4) */
                else if (oNode.nodeType === 3) {
                    sCollectedTxt += oNode.nodeValue;
                } /* nodeType is "Text" (3) */
                else if (oNode.nodeType === 1) { /* nodeType is "Element" (1) */

                    if (nLength === 0) {
                        vResult = {};
                    }

                    // using nodeName to support browser (IE) implementation with no 'localName' property
                    if (options.stripElemPrefix) {
                        sProp = oNode.nodeName.replace(prefixMatch, '');
                    } else {
                        sProp = oNode.nodeName;
                    }

                    vContent = xmlToJSON.parseXML(oNode);

                    if (vResult.hasOwnProperty(sProp)) {
                        if (vResult[sProp].constructor !== Array) {
                            vResult[sProp] = [vResult[sProp]];
                        }
                        vResult[sProp].push(vContent);

                    } else {
                        if (options.childrenAsArray) {
                            vResult[sProp] = [];
                            vResult[sProp].push(vContent);
                        } else {
                            vResult[sProp] = vContent;
                        }
                        nLength++;
                    }
                }
            }
        } else if (!sCollectedTxt) { // no children and no text, return null
            if (options.childrenAsArray) {
                vResult[options.textKey] = [];
                vResult[options.textKey].push(null);
            } else {
                vResult[options.textKey] = null;
            }
        }

        if (sCollectedTxt) {
            if (options.grokText) {
                var value = this.grokType(sCollectedTxt.replace(trimMatch, ''));
                if (value !== null && value !== undefined) {
                    vResult[options.textKey] = value;
                }
            } else if (options.normalize) {
                vResult[options.textKey] = sCollectedTxt.replace(trimMatch, '').replace(/\s+/g, " ");
            } else {
                vResult[options.textKey] = sCollectedTxt.replace(trimMatch, '');
            }
        }

        return vResult;
    }


    // Convert xmlDocument to a string
    // Returns null on failure
    this.xmlToString = function (xmlDoc) {
        try {
            var xmlString = xmlDoc.xml ? xmlDoc.xml : (new XMLSerializer()).serializeToString(xmlDoc);
            return xmlString;
        } catch (err) {
            return null;
        }
    }

    // Convert a string to XML Node Structure
    // Returns null on failure
    this.stringToXML = function (xmlString) {
        try {
            var xmlDoc = null;

            if (window.DOMParser) {

                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(xmlString, "text/xml");

                return xmlDoc;
            } else {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlString);

                return xmlDoc;
            }
        } catch (e) {
            return null;
        }
    }

    return this;
}).call({});

if (typeof module != "undefined" && module !== null && module.exports) module.exports = xmlToJSON;
else if (typeof define === "function" && define.amd) define(function() {return xmlToJSON});
