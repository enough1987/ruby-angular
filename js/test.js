

$("#but-change1").click( 

        function() { 

            $("#test2").hide();  
            $("#test1").show("slide", { direction: "right" }, 500); 

        } 

    );

$("#but-change2").click( 

        function() { 

            $("#test1").hide();  
            $("#test2").show("slide", { direction: "right" }, 500); 

        } 

    );