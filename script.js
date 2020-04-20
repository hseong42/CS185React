function load() {
	window.addEventListener("scroll", scroll)

	$(".img").on("click", function(click){
        $("#imagesModal").show()
        click.stopPropagation()
    })

	$("body").click(function() {
    })

    $("#imagesModal").click(function() {
    	$("#imagesModal").hide()
    })

    $("#image").click(function(click) {
        click.stopPropagation()
    })

}

function bigPicture(image) {
	var modalImage = document.getElementById('image')
	modalImage.src = image
	document.getElementById('imagesModal').style.display="block"
}

function closePicture() {
	document.getElementById('imagesModal').style.display="none"
}

function keep(click) {
	click.stopPropogation()
}

function scroll() {
	toTop = document.getElementById("toTop")
	if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
		toTop.style.display = "block"
	} else {
		toTop.style.display = "none"
	}
}



function toTop() {
	const btn = document.querySelector("#top")
	btn.addEventListener("click", event => {
		document.body.scrollTop = 0
    	document.documentElement.scrollTop = 0
	})
}
