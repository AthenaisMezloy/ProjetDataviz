        // Q3.2 Détecter le clic sur le titre du volet déroulant
        document.querySelector(".volet-invisible").addEventListener('click', function (e) {
            // Q3.3 Animer le volet pour le déroulet
            document.querySelector(".volet-invisible").animate([{ "height": "300px" }],
                { "duration": 800 })
            setTimeout(function f() {
                // Attribuer la classe volet-visible à la place de la classe volet-invisible
                document.querySelector(".volet-invisible").classList.add("volet-visible");
                document.querySelector(".volet-invisible").classList.remove("volet-invisible");
            }, 800)
            console.log("clic !");
        })

        