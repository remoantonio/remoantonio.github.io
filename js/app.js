let heroesArr = []
$(() => {

    $.ajax({
        type: "get",
        url: "https://api.opendota.com/api/heroes",
        }
    ).then((heroes) => {
        heroes.forEach(element => {
            heroesArr.push(element)
    })
    $('<div>').attr('id', 'str').addClass('attribute').appendTo($('#container')).css('background-color', 'red')
    $('<div>').attr('id', 'agi').addClass('attribute').appendTo($('#container')).css('background-color', 'green')
    $('<div>').attr('id', 'int').addClass('attribute').appendTo($('#container')).css('background-color', 'blue')
    for (let i = 0; i < heroesArr.length; i++) {
        let img = 'https://hgv-hyperstone.azurewebsites.net/heroes/banner/' + heroesArr[i].name + '.png'
        if (heroesArr[i].primary_attr == 'str') {
            $('<div>').attr('id', heroesArr[i].id).addClass('heroes').addClass(heroesArr[i].localized_name).appendTo($('#str')).css('background-image', 'url(' + img + ')')
        } else if (heroesArr[i].primary_attr == 'agi') {
            $('<div>').attr('id', heroesArr[i].id).addClass('heroes').addClass(heroesArr[i].localized_name).appendTo($('#agi')).css('background-image', 'url(' + img + ')')
        } else if (heroesArr[i].primary_attr == 'int') {
            $('<div>').attr('id', heroesArr[i].id).addClass('heroes').addClass(heroesArr[i].localized_name).appendTo($('#int')).css('background-image', 'url(' + img + ')')
        }}});
        
        console.log(heroesArr)
})