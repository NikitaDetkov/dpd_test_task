type Location = {
    city: string,
    country: string,
    postcode: number | string,
    state: string,
    coordinates: {
        latitude: string,
        longitude: string,
    },
    street: {
        name: string,
        number: number,
    },
    timezone: {
        description: string,
        offset: string
    }
};

type Login = {
    md5: string,
    password: string,
    salt: string,
    sha1: string,
    sha256: string,
    username: string,
    uuid: string,
};

type Name = {
    first: string,
    last: string,
    title: string,
};

type Picture = {
    large: string,
    medium: string,
    thumbnail: string,
};

type Registered = {
    age: number,
    date: string,
};

type Id = {
    name: string,
    value: string | null,
};

type Dob = {
    age: number,
    date: string
};

export type User = {
    fullname: string,
    dateBirth: string,
    cell: string,
    email: string,
    gender: string,
    nat: string,
    phone: string,
    id: Id,
    dob: Dob,
    login: Login,
    name: Name,
    picture: Picture,
    registered: Registered,
    location: Location
};

export type UserList = User[];