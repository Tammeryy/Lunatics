import { Post } from './post';

export const POST: Post = {
  post_id: 0,
  title: 'Watch Youtube',
  description: 'Procrastination service',
  poster_id: 0,
  poster_name: 'Tex',
  lowest_bid: 5,
  task_open: true,
  due_date: '10 October 2018',
  location: 'Lazy Town',
  bids: [
    {
      name: 'CheapGuy',
      phone_no: 94927372,
      email: 'dirtcheapoffers@cheap.com',
      description: "You won't find any other offer like this one!!!",
      bid_offer: 5
    },
    {
      name: 'Steve',
      phone_no: 2401010101,
      email: 'steve@smail.com',
      description: "Will give you 39",
      bid_offer: 7
    }
  ]
}

export const POSTS: Post[] = [
    {
        post_id: 1,
        title: 'Cook for 50-people event',
        description: 'Cater for a wedding event with various options (vegan, vegetarian, etc..)',
        poster_id: 1,
        poster_name: 'Steven',
        lowest_bid: 1500,
        task_open: true,
        due_date: '1 April 2017',
        location: 'Sesame Street',
        bids: [
            {
                name: 'MrChef',
                phone_no: 95727273,
                email: 'cookingfanatic@masterchef.com',
                description: "A decent price for high-quality food services",
                bid_offer: 1500
            }
        ]
    },
    {
        post_id: 2,
        title: 'Clean the house',
        description: 'Clean the house before 3pm today',
        poster_id: 2,
        poster_name: 'Emily',
        lowest_bid: 1254,
        task_open: true,
        due_date: '2 April 2017',
        location: 'Soya Street',
        bids: [
            {
                name: 'MrCleaner',
                phone_no: 95472673,
                email: 'supercleanfreak@germfree.com',
                description: "your house will be 100% clean in all corners",
                bid_offer: 1254
            },
            {
                name: 'Average Fellow',
                phone_no: 95472673,
                email: 'imaverage@gmail.com',
                description: "a low price for fairly decent cleaning",
                bid_offer: 800
            },
            {
                name: 'Cannot Be Bothered',
                phone_no: 91232673,
                email: 'ceebs@life.com',
                description: "totally won't do a dodgy job at cleaning the house",
                bid_offer: 200
            }
        ]
    },
    {
        post_id: 3,
        title: "Buy and deliver groceries",
        description: "Buy groceries at specified shops given a to-buy list",
        poster_id: 1,
        poster_name: "Steven",
        lowest_bid: 0,
        task_open: true,
        due_date: '2 April 2017',
        location: 'Soya Street',
        bids: []
    },
    {
        post_id: 4,
        title: "Send message to friends",
        description: "Type what I say and send to my friends",
        poster_id: 3,
        poster_name: "Tracey",
        lowest_bid: 10,
        task_open: false,
        due_date: '2 April 2017',
        location: 'Soya Street',
        bids: [
            {
                name: 'CheapGuy',
                phone_no: 94927372,
                email: 'dirtcheapoffers@cheap.com',
                description: "You won't find any other offer like this one!!!",
                bid_offer: 3
            },
            {
                name: 'Steve',
                phone_no: 2401010101,
                email: 'steve@smail.com',
                description: "a nice deal",
                bid_offer: 7
            }
        ]
    },
    {
        post_id: 5,
        title: "Drive to airport",
        description: "Drive me and my family to the airport before 10am",
        poster_id: 4,
        poster_name: "Chrissy",
        lowest_bid: 80,
        task_open: true,
        due_date: '2 April 2017',
        location: 'Soya Street',
        bids: [
            {
                name: 'Steve',
                phone_no: 2401010101,
                email: 'steve@smail.com',
                description: "a nice deal",
                bid_offer: 80
            }
        ]
    },
    {
        post_id: 6,
        title: "Buy me chips thx",
        description: "Anything :)",
        poster_id: 5,
        poster_name: "Steven", // tests two posters with same name but different ids
        lowest_bid: 5,
        task_open: true,
        due_date: '13 October 2018',
        location: 'Lazy Street',
        bids: [
            {
                name: 'Ynot',
                phone_no: 99959993,
                email: 'itstony@gmail.com',
                description: "sure m8",
                bid_offer: 5
            }
        ]
    }
];
