import { Post } from './post';

export const POST: Post = {
  title: 'Watch Youtube',
  description: 'Procrastination service',
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
        title: 'Cook for 50-people event',
        description: 'Cater for a wedding event with various options (vegan, vegetarian, etc..)',
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
        title: 'Clean the house',
        description: 'Clean the house before 3pm today',
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
        title: "Buy and deliver groceries",
        description: "Buy groceries at specified shops given a to-buy list",
        poster_name: "Steven",
        lowest_bid: 0,
        task_open: true,
        due_date: '2 April 2017',
        location: 'Soya Street',
        bids: []
    },
    {
        title: "Send message to friends",
        description: "Type what I say and send to my friends",
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
        title: "Drive to airport",
        description: "Drive me and my family to the airport before 10am",
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
    }
];
