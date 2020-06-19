GET /heroes/{hero_id}/matchups : using for determining who is best or worst against a hero

GET /heroes : generating hero list

Different API

https://docs.stratz.com/index.html - api

/api/v1/Hero/{id} - hero info along with lane info

/api/v1/Hero/{id}/dryad - best/worst lane partners

Roles:
0 : Core
1 : Support

Lanes:
1 : Safe
2: Mid
3: Off


Planning on creating an array or object to house the addition and subtraction of synergy between the pick slots. Leaning toward array.

Ex:

synergyArr = [
    0 : [pick0 : syn0]
    1 : [pick1 : syn1]
    2 : [pick2 : syn2]
    3 : [pick3 : syn3]
    4 : [pick4 : syn4]
    sum : total synergy
]

Would like to change character's bg color depending on how synergistic it is with the draft.