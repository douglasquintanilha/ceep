document.querySelector("#mudaLayout").addEventListener("click", function(){
	//Pega o elemento com a class="mural"
	var mural = document.querySelector(".mural");
	//Tira ou coloca a classe
	mural.classList.toggle("mural--linhas");
	if (mural.classList.contains("mural--linhas")){
		this.textContent = "Blocos";
	} else {
		this.textContent = "Linhas";
	}
});
// ##################################################

var botoes = document.querySelectorAll(".opcoesDoCartao-remove");
for (var i = 0; i < botoes.length; i++) {
	botoes[i].addEventListener("click",removeCartao);
}

function removeCartao(){
	var cartao = document.querySelector("#cartao_" + this.dataset.ref);

	cartao.classList.add("cartao--some");

	setTimeout(function(){
		cartao.remove();
	},500);
}

// ##################################################
var contador = $(".cartao").length;
$(".novoCartao").submit(function(event){
	event.preventDefault();
	var campoConteudo = $(".novoCartao-conteudo");
	var conteudo = campoConteudo.val().trim().replace(/\n/g,"<br>")
											 .replace(/\*\*(.*)\*\*/g,"<b>$1</b>")
											 .replace(/\*(.*)\*/g,"<em>$1</em>");
	if(conteudo){
		contador++;
		var conteudoTag = $("<p>").addClass("cartao-conteudo")
								  .append(conteudo);

		var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
									   .attr("data-ref", contador)
									   .text("Remover")
									   .click(removeCartao);

		var opcoes = $("<div>").addClass("opcoesDoCartao")
							   .append(botaoRemove);

		var tipoCartao = decideTipoCartao(conteudo);

		$("<div>").attr("id","cartao_"+contador)
				  .addClass("cartao")
				  .addClass(tipoCartao)
				  .append(opcoes)
				  .append(conteudoTag)
				  .prependTo(".mural");
	}

	campoConteudo.val("");
});

function decideTipoCartao(conteudo){
	var quebras = conteudo.split("<br>").length;
	var totalDeLetras = conteudo.replace(/<br>/g," ").length;
	var ultimoMaior = "";
	console.log(ultimoMaior);

	conteudo.replace(/<br>/g," ")
			.split(" ")
			.forEach(function(palavra){
				if(palavra.length > ultimoMaior.length){
					ultimoMaior = palavra;
				}
			});
	var tamMaior = ultimoMaior.length;

	var tipoCartao = "cartao--textoPequeno";

	if(tamMaior < 9 && quebras < 5 && totalDeLetras < 55 ){
		tipoCartao = "cartao--textoGrande";
	}else if(tamMaior < 12 && quebras < 6 && totalDeLetras < 75){
		tipoCartao = "cartao--textoMedio";
	}

	return tipoCartao;
}

$("#busca").on("input",function(){
	var busca = $(this).val().trim();
	var $cartoes = $(".cartao");
	if(busca.length){
		$cartoes.hide().filter(function(){
			var cartaoConteudo = $(this).find(".cartao-conteudo");
			var conteudo = cartaoConteudo.text();
			var regex = new RegExp("("+ busca+")","g");
			conteudo = conteudo.replace(regex,"<strong>$1</strong>");

			cartaoConteudo.html(conteudo);

			return conteudo;

			// return $(this).find(".cartao-conteudo")
			// 			  .text()
			// 			  .match(new RegExp(busca,"i"));
		}).show();
	}else{
		$cartoes.show();
	}
});


$("#ajuda").click(function () {
	console.log("Cliquei");
	$.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes",
		function(res){
			console.log(res);

			res.instrucoes.forEach(function(instrucao){
				adicionaCartao(instrucao.conteudo,instrucao.cor);
			})
		}
	);
});

function adicionaCartao(conteudo,cor){
	contador++;
	var conteudoTag = $("<p>").addClass("cartao-conteudo")
							  .append(conteudo);

	var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
								   .attr("data-ref", contador)
								   .text("Remover")
								   .click(removeCartao);

	var opcoes = $("<div>").addClass("opcoesDoCartao")
						   .append(botaoRemove);

	var tipoCartao = decideTipoCartao(conteudo);

	$("<div>").attr("id","cartao_"+contador)
			  .addClass("cartao")
			  .addClass(tipoCartao)
			  .css("background-color", cor)
			  .append(opcoes)
			  .append(conteudoTag)
			  .prependTo(".mural");(
}

$("#sync").click(function()){
	var cartoes = [];

	$(".cartoes").each(function(){
		var cartao = {};
		cartao.conteudo = $(this).find(".cartao-conteudo").html();
		cartoes.push(cartao);
	});

	var mural = 
}
