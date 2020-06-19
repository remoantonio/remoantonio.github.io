// Creating a null object inside of heroesArr to match hero id with array ID
let heroesArr = [[null]]
let radPick ={}
let lanes = [
    'safelane',
    'midlane',
    'offlane'
]
class makeHeroSyn {
    constructor (heroID, name){
    this.heroID = heroID
    this.name = name
    }
    pick0 = null;
    pick1 = null;
    pick2 = null;
    pick3 = null;
    pick4 = null;
    synTotal = null;
    sumSyn() {
            this.synTotal = this.pick0 + this.pick1 + this.pick2 + this.pick3 + this.pick4
    }
}
let synArr = [[null]]
$(() => {
    $.ajax({
        type: "get",
        url: "https://api.opendota.com/api/heroes",
        }).then((heroes) => {
        heroes.forEach(element => {
            heroesArr.push(element)
                // Generating Synergy Array ////////////////////// Complete
            synArr.push(new makeHeroSyn(element.id, element.localized_name))
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
// synergy function attached to corresponding heroes and sum /////////////////////       FIXED
// It seems as though brewmaster and omniknight are left out of the synergy calculations from the API
function synergy() {
    for (let i = 0; i < radPick[currentPick].advantage[0].with.length; i++) {
        for (let j = 0; j < synArr.length; j++) {
            if (synArr[j].heroID == radPick[currentPick].advantage[0].with[i].heroId2) {
                synArr[j][currentPick] = radPick[currentPick].advantage[0].with[i].synergy
                synArr[j].sumSyn()
                $('#' + radPick[currentPick].advantage[0].with[i].heroId2).text(synArr[j].synTotal)
            }
        }
    }
}
// sort function ///////////////////////        FIXED
function sorting(location) {
    // console.log($('#' + location[0] + ' > div').toArray().sort(function(a, b) { return a.id - b.id}))
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
        // introduced logic to return  heroes if replaced by another hero.
        // console.log($(event.currentTarget).children().length)
        if ($(event.currentTarget).children().length == 0) {
            $(event.currentTarget).append(item)
        } else {
            // console.log($(event.currentTarget).children().eq(0).attr('class'))
            let location = ($(event.currentTarget).children().eq(0).attr('class')).split(' ')
            // console.log(location)
            $(event.currentTarget).children().eq(0).detach().appendTo($('#' + location[0]))
            $(event.currentTarget).append(item)
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
                // Working on calculating synergy with line-up
                // console.log(($(event.currentTarget).attr('id')))
                window.currentPick = ($(event.currentTarget).attr('id'))
                synergy()
            })
    }
    for (let i = 0; i < 3; i++) {
        $('<div>').attr('id', lanes[i]).appendTo($('#lanes')).addClass('lanes').text(lanes[i])
    }
    for (let i = 0; i < 5; i++) {
        $('<div>').attr('id', 'pick' + i).appendTo($('#picks')).addClass('picks').attr('droppable','true').on('dragover', false).on('drop', drop)
        // removed background text from pick locations
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