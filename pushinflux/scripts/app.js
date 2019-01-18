var dbURL = "http://influxip:8086/write?db=dbname"; //inflxudb address


setIntervalHandler(function() {
  var vals = metric('10.10.0.1','2.1000.ovs_dp_flows,2.1000.ovs_dp_hits,2.1000.ovs_dp_misses,2.1000.ovs_dp_masks,2.1000.ovs_dp_lost,2.ifinpkts,2.ifoutpkts,5.ifinpkts,5.ifoutpkts',{}); //pulling select by 10.10.0.1 agent
//  logWarning(vals);
  var body = [];
  for each (var val in vals) {
     body.push(val.metricName + ' value=' + val.metricValue); //influx format for post request
  }
  try {
//logWarning("ICERIK = \n" + body);
http(dbURL,'post', 'text/plain', body.join('\n')); }   //sending
  catch(e) { logWarning('http error ' + e); 
	logWarning(body);
}
} , 1);

