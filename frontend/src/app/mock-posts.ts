import { Post } from './post';

export const POSTS: Post[] = [
    {
        id: 0,
        title: "Cook for 20-people event",
        description: "Cater for a party event with various options (vegan, vegetarian, etc..)",
        poster_id: 2,
        budget: 500,
        location: "auburn",
        num_ppl: 40,
        bid_close: "15/10/2018",
        event_date: "21/11/2018",
        cuisine: "Chinese",
        quality: "Fine Dining",
        diet: "Vegetarian",
        lowest_bid: 400,
        task_open: "true"
    },
    {
        id: 1,
        title: "Cook for 50-people event",
        description: "Cater for a wedding event with various options (vegan, vegetarian, etc..)",
        poster_id: 1,
        budget: 88.88,
        location: "cabramatta",
        num_ppl: 10,
        bid_close: "10/10/2018",
        event_date: "24/11/2018",
        cuisine: "Indian",
        quality: "Fine Dining",
        diet: "Vegetarian",
        lowest_bid: 90,
        task_open: "true"
    },
    {
        id: 2,
        title: "Cater malaysian food",
        description: "Cook for a family",
        poster_id: 2,
        budget: 100.00,
        location: "parramatta",
        num_ppl: 20,
        bid_close: "11/11/2018",
        event_date: "24/12/2018",
        cuisine: "Malaysian",
        quality: "Fast Food",
        diet: "Halal",
        lowest_bid: 110,
        task_open: "true"
    },
    {
        id: 3,
        title: "Buy and deliver groceries",
        description: "Buy groceries at specified shops given a to-buy list",
        poster_id: 3,
        budget: 32,
        location: 'Soya Street',
        num_ppl: 10,
        bid_close: "22/12/2018",
        event_date: "24/12/2018",
      cuisine: "Malaysian",
        quality: "Fast Food",
        diet: "Halal",
        lowest_bid: 0,
        task_open: "true",
    },
    {
        id: 4,
        title: "Cook Greek Food",
        description: "Hearty meal for the big family",
        poster_id: 3,
        budget: 150,
        location: 'Foya Street',
        num_ppl: 20,
        bid_close: "26/10/2018",
        event_date: "15/11/2018",
        cuisine: "Greek",
        quality: "Homemade meals",
        diet: "Healthy",
        lowest_bid: 140,
        task_open: "true",
    },
];
