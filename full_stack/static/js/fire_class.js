fetch('/fireclass')
  .then(response => response.json())
  .then(data => {
    // console.log(data);
// create trendlines for each fire class
     trace0 = {
      type: 'scatter',
      x: data[0]['fire_year'],
      y: data[0]['fire_id'],
      mode: 'lines',
      name: 'Class A',
      line: {
        color: 'rgb(44, 120, 229)',
        width: 1
      }
    };
    trace1 = {
      type: 'scatter',
      x: data[1]['fire_year'],
      y: data[1]['fire_id'],
      mode: 'lines',
      name: 'Class B',
      line: {
        color: 'rgb(44, 229, 214)',
        width: 1
      }
    };
    trace2 = {
      type: 'scatter',
      x: data[2]['fire_year'],
      y: data[2]['fire_id'],
      mode: 'lines',
      name: 'Class C',
      line: {
        color: 'rgb(44, 229, 59)',
        width: 1
      }
    };
    trace3 = {
      type: 'scatter',
      x: data[3]['fire_year'],
      y: data[3]['fire_id'],
      mode: 'lines',
      name: 'Class D',
      line: {
        color: 'rgb(165, 229, 44)',
        width: 1
      }
    };
    trace4 = {
      type: 'scatter',
      x: data[4]['fire_year'],
      y: data[4]['fire_id'],
      mode: 'lines',
      name: 'Class E',
      line: {
        color: 'rgb(217, 229, 44)',
        width: 1
      }
    };
    trace5 = {
      type: 'scatter',
      x: data[5]['fire_year'],
      y: data[5]['fire_id'],
      mode: 'lines',
      name: 'Class F',
      line: {
        color: 'rgb(229, 164, 44)',
        width: 1
      }
    };
    trace6 = {
      type: 'scatter',
      x: data[6]['fire_year'],
      y: data[6]['fire_id'],
      mode: 'lines',
      name: 'Class G',
      line: {
        color: 'rgb(230, 30, 30)',
        width: 1
      }
    };
    // Manipulation of plot size and labels
    var layout = {
      title: "Fire Class Counts by Year",
      width: 700,
      height: 700,
      xaxis: {
        title: {
          text: "Year",
          standoff: 20
        }
      },
      yaxis: {
        title: {
          text: "Number of Fires",
          standoff: 20
        }
      },
      // Addition of annotation to bottom of plot (i.e. class criteria)
      annotations: [
                 {
              xref: 'paper',
              yref: 'paper',
              x: 0.45,
              y: -0.1,
              xanchor: 'center',
              yanchor: 'top',
              text: 'A=0.0-25 acres, B=0.26-9.9 acres, C=10.0-99.9 acres, D=100-299 acres, E=300 to 999 acres, F=1000 to 4999 acres, and G=5000+ acres.',
              showarrow: false,
              font: {
                family: 'Arial',
                size: 10,
                color: 'rgb(150,150,150)'
              }
            }
          ]
    };
// Enter trend lines into plot
    var data = [trace0, trace1, trace2, trace3, trace4, trace5, trace6];
    Plotly.newPlot('lineplotDiv', data, layout);

  })