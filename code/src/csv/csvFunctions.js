const formatResultsAsCSV = (roomResults) => {
  var csv = [
    ['Poll Title', 'Options', 'Number of Votes']
  ]

  roomResults.order.forEach((poll_id) => {
    let pollResults = roomResults.allResults[poll_id];
    let options = pollResults.optionsOrder.map(id => pollResults.options[id].value);
    let numVotes = pollResults.optionsOrder.map(id => pollResults.results[id].count);

    for (var i = 0; i < options.length; i++) {
      var row;
      if (i == 0) {
        csv.push([pollResults.title, options[i], numVotes[i]]);
      } else {
        csv.push(["", options[i], numVotes[i]]);
      }
    }
  })

  return csv
}

export  { formatResultsAsCSV };
