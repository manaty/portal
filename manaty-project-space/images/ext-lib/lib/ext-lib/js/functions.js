function neo4jToGraphJson(res) {
	//console.log(res);
	if (res.errors.length > 0) {
		return res.errors;
	} else {

		var nodes = [];
		var deletedNodes = [];
		var rels = [];
		var notDuplicatedRels = [];
		var arcLarges = [-30, 80, -80, 110];
		var labels = [];
		function findNode(nodes, id) {
			for (var i = 0; i < nodes.length; i++) {
				if (nodes[i].id == id)
					return i;
			}
			return -1;
		}
		res.results.forEach(function (result) {
			result.data.forEach(function (row) {
				if (typeof row.graph != 'undefined') {
					row.graph.nodes.forEach(function (n) {
						if (typeof n.properties != 'undefined') {
							if ((n.labels[0]!='Person' || (n.labels[0]=='Person' && !n.properties['lastName'].endsWith('-tmp'))) && n.properties['internal_active'] == 'TRUE') {

								var found = nodes.filter(function (m) {
										return m.id == n.id;
									}).length > 0;
								if (!found) {
									//n.props=n.properties;
									for (var p in n.properties || {}) {
										if (!p.endsWith('_IDX') && !p.endsWith('_key') && !p.startsWith('internal_')) {
											n[p] = n.properties[p];
											delete n.properties[p];
										}
									}
									delete n.properties;
									nodes.push(n);
									labels = labels.concat(n.labels.filter(function (l) {
												labels.indexOf(l) == -1
											}))
								}
							} else {
								// console.log("deleted node");
								// console.log(n.id);
								deletedNodes = deletedNodes.concat(n);
							}
						}

					});
					row.graph.relationships.forEach(function (r) {
						//console.log(r);
						var found = rels.filter(function (m) {
								return m.edgeId == r.id;
							}).length > 0;
						var deleted = deletedNodes.filter(function (m) {
								return m.id == r.startNode || m.id == r.endNode;
							}).length > 0;

						if (!found && !deleted) {
							var largArcValue = 30;

							var key = r.startNode + "-" + r.endNode;
							var count = notDuplicatedRels.filter(function (val) {
									return val === key;
								}).length;
							if (count > 0) {
								largArcValue = arcLarges[count - 1];
							}

							notDuplicatedRels = notDuplicatedRels.concat(key);
							rels = rels.concat({
									edgeId : r.id,
									largeArc : largArcValue,
									source : r.startNode,
									target : r.endNode,
									type : r.type,
									properties : r.properties
								});
						}
					});
				}
			});
		});

		var newEdgesArr = rels.filter((edge, index, self) => self.findIndex((t) => {return t.source === edge.source && t.target === edge.target && t.type === edge.type; }) === index)
		// console.log("EDGES:");
		// console.log(rels);
		// console.log(newEdgesArr);
		return ({
			graph : {
				nodes : nodes,
				edges : newEdgesArr
			},
			labels : labels
		});
	}

}

function getEdgeCaption(edge) {
	switch (edge.type) {
	case "Position":
		return edge.properties.position;

	default:
		return edge.type;
	};
}

function getNodeCaption(node) {
	switch (node.labels[0]) {

	case "Person":
		if (node.completName != null && node.completName != 'undefined') {
			return node.completName;
		} else {
			return node.firstName + " " + node.lastName;
		}
	case "Company":
		return node.companyName;
	case "Phone":
		return node.internationalCode + node.phoneNumber;
	case "Address":
		return node.address;
	case "Email":
		return node.email;
	case "Website":
		return node.domainName;
	case "Trademark":
		return node.trademark;
	case "Source":
		return node.sourceName;
	case "Payment":
		return node.paymentMode;
	default:
		return node.labels[0];
	};
}

function removeByAttr(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i]
           && arr[i].hasOwnProperty(attr)
           && (arguments.length > 2 && arr[i][attr] === value ) ){

           arr.splice(i,1);

       }
    }
    return arr;
}

Array.prototype.cloneArray = function() {
	return this.slice(0);
};
