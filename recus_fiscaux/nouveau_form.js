$('#f_numeraire_1, #f_nature_1').forEach((i) => {
	i.onchange = selectType;
});

function selectType() {
	g.toggle('.type-numeraire', $('#f_numeraire_1').checked, false);
}

selectType();

var e = $('#f_entreprise_1');

function selectEntreprise() {
	g.toggle('.entreprise', e ? e.checked : false);
	g.toggle('.particulier', e ? !e.checked : true);

}

if (e) {
	e.onchange = selectEntreprise;
}

selectEntreprise();

var y = $('#f_annees');

if (y) {
	function selectYear() {
		$('#f_nature_1').checked = $('#f_numeraire_1').checked
			= $('#f_moyens_especes_1').checked
			= $('#f_moyens_cheques_1').checked
			= $('#f_moyens_autres_1').checked = false;

		let year = y.value;
		let d = user_years[year];
		$('#f_montant').value = g.formatMoney(d.total);

		$('#f_nature_1').checked = d.total_nature > 0;
		$('#f_abandon_frais_1').checked = d.total_abandon_frais > 0;
		$('#f_numeraire_1').checked = d.total_numeraire > 0;
		$('#f_moyens_especes_1').checked = d.total_especes > 0;
		$('#f_moyens_cheques_1').checked = d.total_cheques > 0;
		$('#f_moyens_autres_1').checked = d.total_numeraire > 0 && (d.total_numeraire > d.total_especes + d.total_cheques);
		$('#f_montant').form.id_transaction.value = d.id_transaction;
		$('#f_montant_numeraire').value = g.formatMoney(d.total_numeraire);
		$('#f_montant_nature').value = g.formatMoney(d.total_nature + d.total_abandon_frais);

		selectType();
	}

	y.onchange = selectYear;
	selectYear();
}
else if ($('#f_periode_date').value == '') {
	g.toggle('.periode-date', false);
}
else {
	g.toggle('.periode-annee', false);
}

let p = $('[name=preview]')[0];

p.addEventListener('click', (e) => {
	let form = e.target.form;
	form.action = "previsualiser.html";
	form.target = "dialog";
	g.openFrameDialog('about:blank', {height: 'auto'});
	form.submit();
	form.action = "";
	form.target = "";
});