
fetch('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json')
    .then(response => response.json())
    .then(data => {
        ////////////////////
        //1.////
        ///////////////////

        //Donuts con mas azucar
        function donutConMasAzucar(data) {
            let maxSugar = 0;
            let nombre = "";

            for (let i = 0; i < data.items.item.length; i++) {
                const donut = data.items.item[i];
                const sugar = donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars;

                const sugarNumber = parseInt(sugar, 10);

                if (sugarNumber > maxSugar) {
                    nombre = donut.name;
                    maxSugar = sugarNumber;
                }
            }

            console.log("Donut con más azúcar es " + nombre + " con " + maxSugar + "g de azúcar.");
        }

        donutConMasAzucar(data);


        //Donuts con mas hierro

        function donutConMasHierro(data) {
            let ironNumber;
            let maxHierro = 0;
            let nombre1;

            for (let i = 0; i < data.items.item.length; i++) {
                const hierro = data.items.item[i].nutrition_facts.nutrition.vitamines[3].percent;

                ironNumber = parseInt(hierro, 10);

                if (ironNumber > maxHierro) {

                    nombre1 = data.items.item[i].name;
                    maxHierro = ironNumber;

                }
            }
            console.log("\n");
            console.log("Donuts con mas hierro es " + nombre1 + " con " + maxHierro + "% de hierro. ");

        }

        donutConMasHierro(data);


        //Donuts con mas proteina

        function donutConMasProteina(data) {
            let proteinNumber;
            let maxProteina = 0;
            let nombre;

            for (let i = 0; i < data.items.item.length; i++) {
                const proteina = data.items.item[i].nutrition_facts.nutrition.proteine;

                proteinNumber = parseInt(proteina, 10);

                if (proteinNumber > maxProteina) {

                    nombre = data.items.item[i].name;
                    maxProteina = proteinNumber;

                }
            }
            console.log("\n");
            console.log("Donuts con mas proteina es " + nombre + " con " + maxProteina + "g de proteina. ");

        }

        donutConMasProteina(data);

        //Donuts con menos fibra

        function donutConMasFibra(data) {
            let fibraNumber;
            let minFibra = Infinity;
            let donutsMinFibra = [];

            for (let i = 0; i < data.items.item.length; i++) {
                const fibra = data.items.item[i].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre;

                fibraNumber = parseInt(fibra, 10);

                if (fibraNumber < minFibra) {

                    minFibra = fibraNumber;
                    donutsMinFibra = [data.items.item[i].name];
                } else if (fibraNumber === minFibra) {

                    donutsMinFibra.push(data.items.item[i].name);
                }
            }
            console.log("\n");
            console.log("Donuts con mas fibra son " + donutsMinFibra.join(", ") + " con " + minFibra + "g de fibra. ");
            console.log("\n");

        }

        donutConMasFibra(data);


        ////////////////////
        //2.////
        ///////////////////

        //Listar todos los donuts y sus calorias 
        //Listar todos los donuts y sus carbohidratos 
        //Mostrar la media de calorias de todos los donuts
        //Mostrar la suma de todas las gradas saturadas de todos los donuts


        let totalCalorias = 0;
        let totalDonuts = data.items.item.length;
        let totalSaturated = 0;
        let numerSaturated;


        for (let i = 0; i < data.items.item.length; i++) {
            const donuts = data.items.item[i].name;
            const calorias = data.items.item[i].nutrition_facts.nutrition.calories;
            const carbohidratos = data.items.item[i].nutrition_facts.nutrition.carbohydrate.carbs_detail.amount;
            const saturated = data.items.item[i].nutrition_facts.nutrition.fat.fat_type.saturated;

            numerSaturated = parseInt(saturated, 10);

            console.log("Donuts: " + donuts + " and Calories: " + calorias + " and Carbohidratos: " + carbohidratos);


            totalCalorias += calorias;
            totalSaturated += numerSaturated;

        }

        let mediaCalorias = totalCalorias / totalDonuts;

        console.log("\n");
        console.log("La media de las calorías de todos los donuts es: " + mediaCalorias);
        console.log("\n");
        console.log("La suma de las grasas saturadas: " + totalSaturated + "g");
        console.log("\n");

        //Mostrar el porcentaje medio de cada vitamina

        function calcularPorcentajeMedioVitaminas(data) {
            const vitaminTotals = {};
            const vitaminCounts = {};

            for (let i = 0; i < data.items.item.length; i++) {
                const donut = data.items.item[i];
                const vitamins = donut.nutrition_facts.nutrition.vitamines;

                for (let j = 0; j < vitamins.length; j++) {
                    const vitamin = vitamins[j];
                    const type = vitamin.type;
                    const percent = parseFloat(vitamin.percent.replace("%", ""));

                    if (vitaminTotals[type]) {
                        vitaminTotals[type] += percent;
                        vitaminCounts[type] += 1;
                    } else {
                        vitaminTotals[type] = percent;
                        vitaminCounts[type] = 1;
                    }
                }
            }

            const vitaminTypes = Object.keys(vitaminTotals);
            const totalValues = Object.values(vitaminTotals);
            const countValues = Object.values(vitaminCounts);

            for (let i = 0; i < vitaminTypes.length; i++) {
                const vitamin = vitaminTypes[i];
                const average = totalValues[i] / countValues[i];
                console.log("La vitamina " + vitamin + " tiene un porcentaje medio de " + average.toFixed(2) + "%");
            }
        }

        calcularPorcentajeMedioVitaminas(data);


        ////////////////////
        //3.////
        ///////////////////

        //Listar cada donuts consus posibles masas, batter
        console.log("\n");
        console.log("Masas de cada donuts: ");

        function masasDonuts(donuts) {
            for (let i = 0; i < donuts.length; i++) {
                const donut = donuts[i];
                console.log("Donut:" + donut.name);
                console.log('Posibles masas:');

                for (let j = 0; j < donut.batters.batter.length; j++) {
                    console.log("-" + donut.batters.batter[j].type);
                }

                console.log('');
            }
        }

        masasDonuts(data.items.item);



        //Listar cada donuts con sus posibles extras topping
        console.log("\n");
        console.log("Toppings de cada donuts:");

        function toppingsDonuts(donuts) {

            for (let i = 0; i < donuts.length; i++) {
                const donut = donuts[i];
                console.log("Donut: " + donut.name);
                console.log("Toppings:");

                for (let j = 0; j < donut.topping.length; j++) {
                    const topping = donut.topping[j];
                    console.log(" - " + topping.type);
                }


            }
        }
        toppingsDonuts(data.items.item);





        ////////////////////
        //4.////
        ///////////////////

        //Monstrar cuantos donuts de cada tipo podemos comprar y las monedas sobrantes

        console.log("\n");
        console.log("Cuantos donuts de cada tipo podemos comprar:  ");

        function calcularDonutsComprar(donuts, monedasDisponibles) {
            for (let i = 0; i < donuts.length; i++) {
                const donut = donuts[i];
                const precio = donut.ppu;
                const cantidad = Math.floor(monedasDisponibles / precio);
                const sobrante = monedasDisponibles % precio;

                console.log("Donut: " + donut.name);
                console.log("Precio por unidad: " + precio.toFixed(2) + " monedas");
                console.log("Cantidad que puedes comprar: " + cantidad);
                console.log("Monedas sobrantes: " + sobrante.toFixed(2));
                console.log("\n");
            }
        }
        const monedas = 4;

        calcularDonutsComprar(data.items.item, monedas);



        ////////////////////
        //5.////
        ///////////////////

        //Los donuts con el coresterol > 12 modificar las grasas trans a  3,2g
        function actualizarGrasasTrans(donuts) {
            for (let i = 0; i < donuts.length; i++) {
                const donut = donuts[i];
                const colesterol = donut.nutrition_facts.nutrition.cholesterol.amount;

                if (parseFloat(colesterol) > 12) {
                    donut.nutrition_facts.nutrition.fat.fat_type.trans = "3.2g";
                }
            }
        }

        actualizarGrasasTrans(data.items.item);

        console.log("Actualizacion de grasas trans: ");
        for (let i = 0; i < data.items.item.length; i++) {
            const donutsCoresterol = data.items.item[i].nutrition_facts.nutrition.fat.fat_type.trans;
            console.log(data.items.item[i].name);
            console.log("-" + donutsCoresterol);
        }
        console.log("\n");

        //Donuts con azucar > 50 modificar el amount de los detalles de carbohidratos a 42g

        function actualizarCarbohidratos(donuts) {
            for (let i = 0; i < donuts.length; i++) {
                const donut = donuts[i];
                const cantidadAzucar = donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars;

                if (parseFloat(cantidadAzucar) > 50) {
                    donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.amount = "42g";
                }
            }
        }

        actualizarCarbohidratos(data.items.item);

        console.log("Actualizacion de carbohidratos: ");
        for (let i = 0; i < data.items.item.length; i++) {
            const donutsCarbohidratos = data.items.item[i].nutrition_facts.nutrition.carbohydrate.carbs_detail.amount;
            console.log(data.items.item[i].name);
            console.log("-" + donutsCarbohidratos);
        }
        console.log("\n");

        //Añadir una vitamina llamada "Nitacina" al donut con el nomre "Magic Fusion"


        function añadirVitamina(donuts, nombreDonut, nuevaVitamina) {
            for (let i = 0; i < donuts.length; i++) {
                const donut = donuts[i];

                if (donut.name === nombreDonut) {
                    donut.nutrition_facts.nutrition.vitamines.push(nuevaVitamina);
                    break;
                }
            }
        }

        const nuevaVitamina = {
            type: "Nitacina",
            percent: "1%"
        };

        añadirVitamina(data.items.item, "Magic Fusion", nuevaVitamina);

        console.log("Nueva vitamina llamada Nitacina: ");
        console.log(data.items.item[2].nutrition_facts.nutrition.vitamines);
        console.log("\n");


        //El daily value de los carbohidratos de todos los donuts va a ser de 53%

        function actualizarCarbohidratosDailyValue(donuts, nuevoDailyValue) {
            for (let i = 0; i < donuts.length; i++) {
                const donut = donuts[i];

                donut.nutrition_facts.nutrition.carbohydrate.daily_value = nuevoDailyValue;
            }
        }
        actualizarCarbohidratosDailyValue(data.items.item, "53%");

        console.log("Actualizacion el daily value de todos los carbohidratos: ");
        for (let i = 0; i < data.items.item.length; i++) {
            const dailyValue = data.items.item[i].nutrition_facts.nutrition.carbohydrate.daily_value;
            console.log(data.items.item[i].name);
            console.log("-" + dailyValue);
        }
        console.log("\n");

        //Crearle un nuevo atributo "Alergen" al donut llamado "Relaxing Alchemy" y que dentro de el ponga "Gluten Free "

        function añadirAlergen(donuts, nombreDonut, nuevoAlergen) {
            for (let i = 0; i < donuts.length; i++) {
                const donut = donuts[i];

                if (donut.name === nombreDonut) {

                    donut.Alergen = nuevoAlergen;
                    break;
                }
            }
        }

        const nuevoAlergen = "Gluten Free";

        añadirAlergen(data.items.item, "Relaxing Alchemy", nuevoAlergen);

        console.log("Nuevo atributo Alergen en el donut Relaxing Alchemy: ");
        console.log(data.items.item[4]);




    })
    .catch(error => console.error('Error:', error));
