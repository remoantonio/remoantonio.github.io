// Creating a null object inside of heroesArr to match hero id with array ID
let heroesArr = [[null]]
let radPick ={}
let posTitle = [
    'core',
    'support',
    'core',
    'core',
    'support'
]
let lanes = [
    'safelane',
    'midlane',
    'offlane'
]
$(() => {
    $.ajax({
        type: "get",
        url: "https://api.opendota.com/api/heroes",
        }).then((heroes) => {
        heroes.forEach(element => {
            heroesArr.push(element)
    })
    $('<div>').attr('id', 'str').addClass('attribute').appendTo($('#container')).css('background-color', 'red')
    $('<div>').attr('id', 'agi').addClass('attribute').appendTo($('#container')).css('background-color', 'green')
    $('<div>').attr('id', 'int').addClass('attribute').appendTo($('#container')).css('background-color', 'blue')
    for (let i = 0; i < heroesArr.length; i++) {
        let img = 'https://hgv-hyperstone.azurewebsites.net/heroes/banner/' + heroesArr[i].name + '.png'
        if (heroesArr[i].primary_attr == 'str') {
            $('<div>').attr('id', heroesArr[i].id).addClass('heroes').addClass(heroesArr[i].localized_name).appendTo($('#str')).css('background-image', 'url(' + img + ')').attr('draggable', 'true').on('mousedown', pickUp)
        } else if (heroesArr[i].primary_attr == 'agi') {
            $('<div>').attr('id', heroesArr[i].id).addClass('heroes').addClass(heroesArr[i].localized_name).appendTo($('#agi')).css('background-image', 'url(' + img + ')').attr('draggable', 'true').on('mousedown', pickUp)
        } else if (heroesArr[i].primary_attr == 'int') {
            $('<div>').attr('id', heroesArr[i].id).addClass('heroes').addClass(heroesArr[i].localized_name).appendTo($('#int')).css('background-image', 'url(' + img + ')').attr('draggable', 'true').on('mousedown', pickUp)
        }}});

    console.log(heroesArr)
let item;
    function pickUp(event) {
        item = $(event.currentTarget)
        return item
    }
    function drop(event) {
        $(event.currentTarget).text('')
        $(event.currentTarget).append(item)
        console.log(item)
        console.log(item.attr('id'))
        $.ajax({
            type: "get",
            url: "https://api.stratz.com/api/v1/Hero/" + item.attr('id') + "/matchUp",
            }).then ((matchUp) => {
                window.item2 = matchUp
                console.log(matchUp)
            })
    }
    $.ajax({
        type: "get",
        url: "https://api.stratz.com/api/v1/Hero/1/matchUp",
        }).then ((matchUp) => {
            radPick.first = matchUp
        })
    for (let i = 0; i < 3; i++) {
        $('<div>').attr('id', lanes[i]).appendTo($('#lanes')).addClass('lanes').text(lanes[i])
    }
    for (let i = 0; i < 5; i++) {
        $('<div>').attr('id', 'pick' + i).appendTo($('#picks')).addClass('picks').text(posTitle[i]).attr('droppable','true').on('dragover', false).on('drop', drop)
    }
    $('#saveDraft').on('click', () => {
        if (localStorage.draftNum == null) {
            localStorage.setItem('draftNum', '0')
            ourDraft = localStorage.getItem('draftNum')
        } else {
            holder = localStorage.getItem('draftNum')
            ourDraft = parseInt(holder) + 1
            localStorage.setItem('draftNum', ourDraft)
        }
        let draft = []
        for (let i = 0; i < 5; i++) {
            draft.push($('#pick' + i).children().eq(0).attr('id'))
        }
        localStorage.setItem('draft' + ourDraft, draft)
    })
})