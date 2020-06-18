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
            $('<div>').attr('id', heroesArr[i].id).addClass(heroesArr[i].primary_attr).addClass(heroesArr[i].localized_name).appendTo($('#str')).css('background-image', 'url(' + img + ')').attr('draggable', 'true').on('mousedown', pickUp)
        } else if (heroesArr[i].primary_attr == 'agi') {
            $('<div>').attr('id', heroesArr[i].id).addClass(heroesArr[i].primary_attr).addClass(heroesArr[i].localized_name).appendTo($('#agi')).css('background-image', 'url(' + img + ')').attr('draggable', 'true').on('mousedown', pickUp)
        } else if (heroesArr[i].primary_attr == 'int') {
            $('<div>').attr('id', heroesArr[i].id).addClass(heroesArr[i].primary_attr).addClass(heroesArr[i].localized_name).appendTo($('#int')).css('background-image', 'url(' + img + ')').attr('draggable', 'true').on('mousedown', pickUp)
        }}});

    console.log(heroesArr)
let item;
// function sort needs work
    function sorting(location) {
        // let holder = []
        console.log($('#' + location[0] + ' > div').toArray().sort(function(a, b) { return a.id - b.id}))
        let holder = $('#' + location[0] + ' > div').toArray().sort(function (a, b) { return a.id - b.id})
        holder.forEach(element => {
            $('#' + location[0]).append(element)
        });
    }
    function pickUp(event) {
        item = $(event.currentTarget)
        return item
    }
    function drop(event) {
        // introduced logic to return  heroes if replaced by another hero. Order has been fixed.
        // console.log($(event.currentTarget).children().length)
        if ($(event.currentTarget).children().length == 0) {
            $(event.currentTarget).append(item)
        } else {
            // console.log($(event.currentTarget).children().eq(0).attr('class'))
            // let location = 'str'
            let location = ($(event.currentTarget).children().eq(0).attr('class')).split(' ')
            // console.log(location)
            $(event.currentTarget).children().eq(0).detach().appendTo($('#' + location[0]))
            // $(event.currentTarget).children().eq(0).detach().appendTo($('#str'))
            $(event.currentTarget).append(item)
            // sorting needs work
            // $('#' + location[0]).children().sort()
            // console.log($('#' + location[0]).children().sort())
            sorting(location)
        }
        // console.log(item)
        // console.log(item.attr('id'))
        $.ajax({
            type: "get",
            url: "https://api.stratz.com/api/v1/Hero/" + item.attr('id') + "/matchUp",
            }).then ((matchUp) => {
                radPick[($(event.currentTarget).attr('id'))] = matchUp
                // console.log($(event.currentTarget).attr('id'))
                // console.log(radPick)
            })
    }
    for (let i = 0; i < 3; i++) {
        $('<div>').attr('id', lanes[i]).appendTo($('#lanes')).addClass('lanes').text(lanes[i])
    }
    for (let i = 0; i < 5; i++) {
        $('<div>').attr('id', 'pick' + i).appendTo($('#picks')).addClass('picks').attr('droppable','true').on('dragover', false).on('drop', drop)
        // removed background text from pick locations
        // $('<div>').attr('id', 'pick' + i).appendTo($('#picks')).addClass('picks').text(posTitle[i]).attr('droppable','true').on('dragover', false).on('drop', drop)
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