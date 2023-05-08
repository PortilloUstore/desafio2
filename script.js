"use strict";

function jsonEmployeesToTable(data, qtPerPage) {
  currentPage = 1;

  document.querySelector(".total").innerHTML = data.length;

  //generate pagination
  let totalPages = Math.ceil(data.length / qtPerPage);
  let templatePages = `<a href="#" class="previous" onclick="previous(${qtPerPage})">Previous</a>`;
  for (var i = 0; i < totalPages; i++) {
    templatePages += `<a class="page" rel="page${
      i + 1
    }" href="#" onclick="goToPage(${i + 1}, ${qtPerPage}, ${i * qtPerPage})">${
      i + 1
    }</a>`;
  }
  templatePages += `<a href="#" class="next" onclick="next(${qtPerPage})">Next</a>`;
  lastPage = i + 1;
  document.querySelector("#pagination").innerHTML = templatePages;
  goToPage(currentPage, qtPerPage, 0);
}

function goToPage(page, qtPerPage, from) {
  employeesDataSliced = employeesData
    .slice(from, from + qtPerPage)
    .map((item, index) => {
      item.index = index + from;
      return item;
    });

  let template = ``;
  employeesDataSliced.forEach((row, i) => {
    let selected = row.selected ? "checked" : "";
    template += `
		<tr class="${selected}">
			<td><input type="checkbox" ${selected} onclick="selectLine(${row.index})"/></td>
			<td>${row.name}</td>
			<td>${row.email}</td>
			<td>${row.address}</td>
			<td>${row.phone}</td>
			<td class="actions">
				<a href="#edit"><img src="assets/edit.png"/></a>
				<a href="#remove"><img src="assets/trash.png"/></a>
			</td>
		</tr>`;
  });

  for (var emptys = employeesDataSliced.length; emptys < qtPerPage; emptys++) {
    template += `
		  <tr>
		  	<td colspan="6"><img/>&nbsp;</td>
		  </tr>
		  `;
  }

  currentPage = page;
  document.querySelectorAll(".pagination a.page").forEach((selector) => {
    selector.classList.remove("activated");
  });
  document
    .querySelector(`a[rel=page${currentPage}]`)
    .classList.add("activated");
  document.querySelector("#employeesList tbody").innerHTML = template;
  document.querySelector(".qt_page").innerHTML = employeesDataSliced.length;

  //Check if has previous or next
  if (currentPage - 1 <= 0) {
    document.querySelector(".previous").classList.add("disabled");
  } else {
    document.querySelector(".previous").classList.remove("disabled");
  }
  if (currentPage + 1 >= lastPage) {
    document.querySelector(".next").classList.add("disabled");
  } else {
    document.querySelector(".next").classList.remove("disabled");
  }
}

function previous(qtPerPage) {
  document.querySelector(`a[rel=page${currentPage - 1}]`).onclick();
}
function next(qtPerPage) {
  document.querySelector(`a[rel=page${currentPage + 1}]`).onclick();
}

function selectLine(index) {
  if (employeesData[index].selected == undefined) {
    employeesData[index].selected = true;
  } else {
    employeesData[index].selected = !employeesData[index].selected;
  }
  checkIfAllSelected();
}
function selectAll() {
  let el = document.querySelector("#selectAll");
  if (el.checked) {
    employeesData.forEach((row) => {
      row.selected = true;
    });
  } else {
    employeesData.forEach((row) => {
      row.selected = false;
    });
  }

  document.querySelector(`a[rel=page${currentPage}]`).onclick();
}
function checkIfAllSelected() {
  let result = true;
  employeesData.forEach((row) => {
    if (row.selected == undefined || row.selected == false) {
      result = false;
      return false;
    }
  });
  if (result) {
    document.querySelector("#selectAll").checked = true;
  } else {
    document.querySelector("#selectAll").checked = false;
  }
}

var employeesDataSliced = [];
var currentPage = 0;
var lastPage = 0;
var employeesData = [
  {
    name: "Fulton Colon",
    email: "fultoncolon@gynk.com",
    phone: "+1 (990) 408-2790",
    address: "388 Suydam Place, Grapeview, Illinois, 3669",
  },
  {
    name: "Dawson Joyner",
    email: "dawsonjoyner@gynk.com",
    phone: "+1 (812) 461-2895",
    address: "365 Gatling Place, Makena, Maryland, 4680",
  },
  {
    name: "Therese Bender",
    email: "theresebender@gynk.com",
    phone: "+1 (916) 523-3135",
    address: "507 Coyle Street, Grahamtown, Hawaii, 4426",
  },
  {
    name: "Swanson Becker",
    email: "swansonbecker@gynk.com",
    phone: "+1 (851) 589-3916",
    address: "221 Louise Terrace, Finderne, Massachusetts, 6084",
  },
  {
    name: "Collier Gilbert",
    email: "colliergilbert@gynk.com",
    phone: "+1 (847) 444-2726",
    address: "302 Colonial Road, Carrizo, Washington, 5797",
  },
  {
    name: "Marcie Stephens",
    email: "marciestephens@gynk.com",
    phone: "+1 (997) 415-2257",
    address: "330 Sackett Street, Biehle, Indiana, 3920",
  },
  {
    name: "Alicia Kirkland",
    email: "aliciakirkland@gynk.com",
    phone: "+1 (903) 593-3173",
    address: "206 Rochester Avenue, Rosedale, Alabama, 4770",
  },
  {
    name: "Elma Vazquez",
    email: "elmavazquez@gynk.com",
    phone: "+1 (957) 561-2686",
    address: "593 Arion Place, Whitehaven, Nebraska, 7559",
  },
  {
    name: "Grimes Holloway",
    email: "grimesholloway@gynk.com",
    phone: "+1 (954) 407-2640",
    address: "118 Amherst Street, Gilmore, Rhode Island, 9124",
  },
  {
    name: "Shelley Forbes",
    email: "shelleyforbes@gynk.com",
    phone: "+1 (955) 566-2869",
    address: "320 Montrose Avenue, Chestnut, New Jersey, 3171",
  },
  {
    name: "Shields Morris",
    email: "shieldsmorris@gynk.com",
    phone: "+1 (850) 546-3964",
    address: "717 Church Lane, Slovan, Federated States Of Micronesia, 3370",
  },
  {
    name: "Lindsay Poole",
    email: "lindsaypoole@gynk.com",
    phone: "+1 (929) 480-3559",
    address: "285 Marconi Place, Cumberland, Alaska, 2443",
  },
  {
    name: "Miriam French",
    email: "miriamfrench@gynk.com",
    phone: "+1 (823) 428-3860",
    address: "609 Highland Boulevard, Vaughn, Kentucky, 1504",
  },
  {
    name: "Haynes Roberson",
    email: "haynesroberson@gynk.com",
    phone: "+1 (957) 530-2161",
    address: "855 Willoughby Street, Kiskimere, New Hampshire, 8080",
  },
  {
    name: "Zelma Meyer",
    email: "zelmameyer@gynk.com",
    phone: "+1 (881) 504-2562",
    address: "813 Cameron Court, Carbonville, South Dakota, 6520",
  },
  {
    name: "Mcclain Hale",
    email: "mcclainhale@gynk.com",
    phone: "+1 (858) 508-2218",
    address: "143 Borinquen Pl, Warsaw, New Mexico, 8405",
  },
  {
    name: "Cotton Pierce",
    email: "cottonpierce@gynk.com",
    phone: "+1 (983) 586-3732",
    address: "587 Norwood Avenue, Boonville, Minnesota, 9047",
  },
  {
    name: "Acosta Haley",
    email: "acostahaley@gynk.com",
    phone: "+1 (893) 565-3116",
    address: "106 Ridgewood Avenue, Toftrees, Delaware, 3038",
  },
  {
    name: "Araceli Olson",
    email: "araceliolson@gynk.com",
    phone: "+1 (978) 413-3432",
    address: "352 Gem Street, Chicopee, Palau, 2620",
  },
  {
    name: "Ursula Palmer",
    email: "ursulapalmer@gynk.com",
    phone: "+1 (822) 584-2851",
    address: "708 Jodie Court, Salvo, Marshall Islands, 540",
  },
  {
    name: "Estella Mckenzie",
    email: "estellamckenzie@gynk.com",
    phone: "+1 (893) 463-2877",
    address: "444 Bay Parkway, Marion, Wisconsin, 3009",
  },
  {
    name: "Weiss Downs",
    email: "weissdowns@gynk.com",
    phone: "+1 (949) 544-3819",
    address: "545 Clermont Avenue, Bawcomville, Idaho, 7955",
  },
  {
    name: "Nguyen Mitchell",
    email: "nguyenmitchell@gynk.com",
    phone: "+1 (909) 531-3046",
    address: "477 Gold Street, Soham, Oklahoma, 5803",
  },
  {
    name: "Jami Gray",
    email: "jamigray@gynk.com",
    phone: "+1 (862) 510-3091",
    address: "830 Williamsburg Street, Harold, Louisiana, 856",
  },
  {
    name: "Barber Guzman",
    email: "barberguzman@gynk.com",
    phone: "+1 (904) 414-2015",
    address: "868 Tilden Avenue, Blodgett, Virginia, 316",
  },
  {
    name: "Lorene Chapman",
    email: "lorenechapman@gynk.com",
    phone: "+1 (899) 504-2133",
    address: "651 Mersereau Court, Bendon, Tennessee, 2722",
  },
  {
    name: "Abigail Head",
    email: "abigailhead@gynk.com",
    phone: "+1 (851) 415-3238",
    address: "930 Bedford Place, Watchtower, Florida, 1733",
  },
  {
    name: "Rachael Leach",
    email: "rachaelleach@gynk.com",
    phone: "+1 (999) 433-3934",
    address: "621 School Lane, Kraemer, Nevada, 825",
  },
  {
    name: "Alma Bailey",
    email: "almabailey@gynk.com",
    phone: "+1 (937) 458-3335",
    address: "547 Devon Avenue, Soudan, Wyoming, 8244",
  },
  {
    name: "Berry Fuentes",
    email: "berryfuentes@gynk.com",
    phone: "+1 (868) 563-3419",
    address: "729 Stratford Road, Greensburg, North Dakota, 5120",
  },
  {
    name: "Neal Dennis",
    email: "nealdennis@gynk.com",
    phone: "+1 (950) 552-2149",
    address: "360 Troy Avenue, Shawmut, West Virginia, 4660",
  },
];

jsonEmployeesToTable(employeesData, 5);
