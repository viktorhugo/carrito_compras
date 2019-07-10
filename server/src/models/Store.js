const _movie_id = Symbol('id')
const _movie_firstname = Symbol('firstname')
const _movie_lastname = Symbol('lastname')

export default class Movie {
    constructor(id, firstname, lastname) {
        this[_movie_id] = id;
        this[_movie_firstname]= firstname;
        this[_movie_lastname]= lastname;
    }

    get id(){ return this[_movie_id] };
    get firstname(){ return this[_movie_firstname] };
    get lastname(){ return this[_movie_lastname] };
    set firstname(newName){ return this[_movie_firstname]= newName };
    set firstname(newlastName){ return this[_movie_lastname]= newlastName };

    get JSON(){
        return JSON.stringify({
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname 
        })
    }

    static fromJSON(json){
        var data = JSON.parse(json)
        var movie = new Movie(data.id, data.firstname, data.lastname)
        return movie
    }
}
