(function () {
   "use strict";

	var request = require("sync-request"),
        fs = require ("fs"),
        _ = require("lodash");

	require("stringformat").extendString("format");

	var dataDirectory = "../data";

	var DEBUG = false,
		apiKey = process.env.OPENFDA_API_KEY || "wzYUjkT1rTAN2FxsEx2BU6geMbulHXrnZBaIQ54o",
		baseUrl = DEBUG ? "http://localhost:8000?" : "https://api.fda.gov/drug/label.json?api_key=" + apiKey,
		pageSize = 100,
		requestLimit = 120000;

	var headers = {
		"accept": "application/json",
		"content-type": "application/json",
		"user-agent": "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)",
		"dnt": "1",
		"accept-language": "en-US,en;q=0.8"
	};

	var fromDate = new Date(2020, 0, 1),
		toDate  = Date.now(),
		monthsPerRequest = 3; // must be a factor of 12;

	var collection = [],
		totalRequestCount = 0;

	for (var dt = fromDate; dt.valueOf() <= toDate.valueOf(); dt.setMonth(dt.getMonth() + monthsPerRequest)) {
		var isoDate = dt.toISOString().slice(0,10).replace(/\D/g, ""),
			endDate = new Date(dt.valueOf());

		endDate.setMonth(dt.getMonth() + monthsPerRequest);
		endDate.setDate(dt.getDate() - 1);

		var isoEndDate = endDate.toISOString().slice(0,10).replace(/\D/g,""),
			query = "&search=effective_time:[{0}+TO+{1}]+AND+_exists_:openfda.brand_name".format(isoDate, isoEndDate);

		var startedAt = Date.now(),
			requestCount = 0,
			apiHasMore = true,
			dataset = [];

		for (var i = 0; apiHasMore; i++) {
			var url = "{0}{3}&skip={1}&limit={2}".format(baseUrl, i * pageSize, pageSize, query),
				items = [];

			console.log(url);

			try {
				requestCount++;
				var response = request("GET", url, {
						headers: headers
					}),
					json = JSON.parse(response.getBody());

				items = json.results.map(function (result) {
					return {
						id: result.id,
						brand_name: result.openfda.brand_name && result.openfda.brand_name.length ? result.openfda.brand_name[0] : null,
						generic_name: result.openfda.generic_name && result.openfda.generic_name.length ? result.openfda.generic_name[0] : null,
						manufacturer_name: result.openfda.manufacturer_name && result.openfda.manufacturer_name.length ? result.openfda.manufacturer_name[0] : null
					};
				});

				apiHasMore = (!DEBUG) && json.results.length === pageSize && i < requestLimit;
			}
			catch (ex) {
				// 404s come here when time period has no entries
				console.log("No data for " + isoDate);
				apiHasMore = false;
			}

			dataset = dataset.concat(items);
		}

		var endedAt = Date.now();
		totalRequestCount += requestCount;

		collection = collection.concat(dataset);

		var endOfYear = endDate.getMonth() === 11 || endDate >= toDate;
		if (endOfYear && collection.length > 0) {
			writeToFile(collection, endDate.getFullYear());
			dataset = null;
			collection = [];
		}

		console.log("{0} requests in {1} seconds".format(requestCount, ((endedAt - startedAt) / 1000).toLocaleString()));
	}

	console.log("{0} total requests made to API".format(totalRequestCount));
	writeMasterFile();

	function writeToFile (data, stamp) {
		var output = data.filter(function (item) {
			return [item.brand_name, item.generic_name, item.manufacturer_name].indexOf(null) === -1;
		});

		console.log(output.length + " entries");

		if (output.length > 0) {
			var filename = "drugs.{0}.json".format(stamp),
				content = JSON.stringify(output, null, 2);

			fs.writeFileSync(dataDirectory + "/" + filename, content);
			console.log("JSON saved to " + filename);

			// filename = "drugs.{0}.min.json".format(isoDate.slice(0,6));
			// content = JSON.stringify(output, null, 0);

			// fs.writeFileSync("../data/" + filename, content);
			// console.log("Compacted JSON saved to " + filename);
		}
	};

	function writeMasterFile() {
		var allJsonData = [];
		var files = fs.readdirSync(dataDirectory);
		for (var i in files) {
		  if (/\.\d{4}\./.test(files[i])) {
			  var jsonData = require(dataDirectory + "/" + files[i]);
			  allJsonData = allJsonData.concat(jsonData);
			}
		}

		var filename = "drugs-all.json",
			content = JSON.stringify(allJsonData, null, 2);

		fs.writeFileSync(dataDirectory + "/" + filename, content);
		console.log("JSON saved to " + filename);

		filename = "drugs-all.min.json";
		content = JSON.stringify(allJsonData, null, 0);

		fs.writeFileSync("../data/" + filename, content);
		console.log("Compacted JSON saved to " + filename);
	}
})();